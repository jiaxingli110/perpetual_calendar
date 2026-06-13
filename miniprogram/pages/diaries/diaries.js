const {
  filterDiaries,
  normalizeDiary,
  readDiaries,
  writeDiaries
} = require("../../utils/storage");
const { dateKey } = require("../../utils/calendar");

Page({
  data: {
    diaries: [],
    visibleDiaries: [],
    editingId: "",
    date: "",
    title: "",
    content: "",
    keyword: "",
    year: "",
    month: "",
    years: [{ value: "", label: "全部年份" }],
    months: [
      { value: "", label: "全部月份" },
      { value: "01", label: "1月" }, { value: "02", label: "2月" },
      { value: "03", label: "3月" }, { value: "04", label: "4月" },
      { value: "05", label: "5月" }, { value: "06", label: "6月" },
      { value: "07", label: "7月" }, { value: "08", label: "8月" },
      { value: "09", label: "9月" }, { value: "10", label: "10月" },
      { value: "11", label: "11月" }, { value: "12", label: "12月" }
    ],
    yearIndex: 0,
    monthIndex: 0
  },

  onLoad(options) {
    this.defaultDate = /^\d{4}-\d{2}-\d{2}$/.test(options.date || "") ? options.date : dateKey(new Date());
    this.resetForm();
  },

  onShow() {
    this.reload();
  },

  reload() {
    const diaries = readDiaries();
    const yearValues = [...new Set(diaries.map((item) => item.date.slice(0, 4)))].sort((a, b) => b.localeCompare(a));
    const years = [{ value: "", label: "全部年份" }, ...yearValues.map((value) => ({ value, label: `${value}年` }))];
    const yearIndex = Math.max(0, years.findIndex((item) => item.value === this.data.year));
    this.setData({ diaries, years, yearIndex });
    this.applyFilters();
  },

  applyFilters() {
    this.setData({
      visibleDiaries: filterDiaries(this.data.diaries, {
        keyword: this.data.keyword,
        year: this.data.year,
        month: this.data.month
      })
    });
  },

  onDateChange(event) {
    this.setData({ date: event.detail.value });
  },

  onTitleInput(event) {
    this.setData({ title: event.detail.value });
  },

  onContentInput(event) {
    this.setData({ content: event.detail.value });
  },

  onKeywordInput(event) {
    this.setData({ keyword: event.detail.value });
    this.applyFilters();
  },

  onYearChange(event) {
    const yearIndex = Number(event.detail.value);
    this.setData({ yearIndex, year: this.data.years[yearIndex].value });
    this.applyFilters();
  },

  onMonthChange(event) {
    const monthIndex = Number(event.detail.value);
    this.setData({ monthIndex, month: this.data.months[monthIndex].value });
    this.applyFilters();
  },

  clearFilters() {
    this.setData({ keyword: "", year: "", month: "", yearIndex: 0, monthIndex: 0 });
    this.applyFilters();
  },

  saveDiary() {
    const title = this.data.title.trim();
    const content = this.data.content.trim();
    if (!title && !content) {
      wx.showToast({ title: "请写下标题或内容", icon: "none" });
      return;
    }

    const now = Date.now();
    const existing = this.data.diaries.find((item) => item.id === this.data.editingId);
    const next = normalizeDiary({
      ...(existing || {}),
      id: existing ? existing.id : undefined,
      date: this.data.date,
      title,
      content,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now
    }, now);
    const diaries = existing
      ? this.data.diaries.map((item) => (item.id === existing.id ? next : item))
      : [...this.data.diaries, next];
    writeDiaries(diaries);
    this.defaultDate = next.date;
    this.resetForm();
    this.reload();
    wx.showToast({ title: existing ? "日记已更新" : "日记已保存" });
  },

  editDiary(event) {
    const entry = this.data.diaries.find((item) => item.id === event.currentTarget.dataset.id);
    if (!entry) return;
    this.setData({
      editingId: entry.id,
      date: entry.date,
      title: entry.title,
      content: entry.content
    });
    wx.pageScrollTo({ scrollTop: 0, duration: 220 });
  },

  cancelEdit() {
    this.resetForm();
  },

  deleteDiary(event) {
    const id = event.currentTarget.dataset.id;
    wx.showModal({
      title: "删除日记",
      content: "确定删除这条日记吗？",
      success: ({ confirm }) => {
        if (!confirm) return;
        writeDiaries(this.data.diaries.filter((item) => item.id !== id));
        if (this.data.editingId === id) this.resetForm();
        this.reload();
      }
    });
  },

  resetForm() {
    this.setData({
      editingId: "",
      date: this.defaultDate || dateKey(new Date()),
      title: "",
      content: ""
    });
  }
});
