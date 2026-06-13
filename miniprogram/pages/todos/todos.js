const {
  filterTodos,
  normalizeTodo,
  readTodos,
  sortTodos,
  writeTodos
} = require("../../utils/storage");
const { dateKey } = require("../../utils/calendar");

Page({
  data: {
    todos: [],
    visibleTodos: [],
    filter: "open",
    filters: [
      { key: "open", label: "未完成" },
      { key: "all", label: "全部" },
      { key: "completed", label: "已完成" }
    ],
    editingId: "",
    text: "",
    date: "",
    time: "09:00",
    reminder: true
  },

  onLoad(options) {
    this.defaultDate = /^\d{4}-\d{2}-\d{2}$/.test(options.date || "") ? options.date : dateKey(new Date());
    this.resetForm();
  },

  onShow() {
    this.reload();
  },

  reload() {
    const todos = sortTodos(readTodos());
    this.setData({ todos, visibleTodos: filterTodos(todos, this.data.filter) });
  },

  applyFilter(filter) {
    this.setData({ filter, visibleTodos: filterTodos(this.data.todos, filter) });
  },

  selectFilter(event) {
    this.applyFilter(event.currentTarget.dataset.filter);
  },

  onTextInput(event) {
    this.setData({ text: event.detail.value });
  },

  onDateChange(event) {
    this.setData({ date: event.detail.value });
  },

  onTimeChange(event) {
    this.setData({ time: event.detail.value });
  },

  onReminderChange(event) {
    this.setData({ reminder: event.detail.value });
  },

  saveTodo() {
    const text = this.data.text.trim();
    if (!text) {
      wx.showToast({ title: "请输入待办内容", icon: "none" });
      return;
    }

    const now = Date.now();
    const existing = this.data.todos.find((todo) => todo.id === this.data.editingId);
    const next = normalizeTodo({
      ...existing,
      id: existing?.id,
      text,
      date: this.data.date,
      time: this.data.time,
      reminder: this.data.reminder,
      done: existing?.done || false,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    }, now);
    const todos = existing
      ? this.data.todos.map((todo) => (todo.id === existing.id ? next : todo))
      : [...this.data.todos, next];
    writeTodos(todos);
    this.resetForm();
    this.reload();
    wx.showToast({ title: existing ? "已更新" : "已添加" });
  },

  editTodo(event) {
    const todo = this.data.todos.find((item) => item.id === event.currentTarget.dataset.id);
    if (!todo) return;
    this.setData({
      editingId: todo.id,
      text: todo.text,
      date: todo.date,
      time: todo.time,
      reminder: todo.reminder
    });
  },

  cancelEdit() {
    this.resetForm();
  },

  toggleTodo(event) {
    const id = event.currentTarget.dataset.id;
    writeTodos(this.data.todos.map((todo) => (
      todo.id === id ? { ...todo, done: !todo.done, updatedAt: Date.now() } : todo
    )));
    this.reload();
  },

  deleteTodo(event) {
    const id = event.currentTarget.dataset.id;
    wx.showModal({
      title: "删除待办",
      content: "确定删除这条待办吗？",
      success: ({ confirm }) => {
        if (!confirm) return;
        writeTodos(this.data.todos.filter((todo) => todo.id !== id));
        if (this.data.editingId === id) this.resetForm();
        this.reload();
      }
    });
  },

  resetForm() {
    this.setData({ editingId: "", text: "", date: this.defaultDate || dateKey(new Date()), time: "09:00", reminder: true });
  }
});
