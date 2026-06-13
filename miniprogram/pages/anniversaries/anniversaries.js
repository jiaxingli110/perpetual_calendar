const { dateKey, parseDate, toLunar, lunarLabel } = require("../../utils/calendar");
const {
  normalizeAnniversary,
  readAnniversaries,
  sortAnniversaries,
  writeAnniversaries
} = require("../../utils/storage");

Page({
  data: {
    anniversaries: [],
    editingId: "",
    name: "",
    type: "solar",
    sourceDate: "",
    preview: ""
  },

  onLoad(options) {
    this.defaultDate = /^\d{4}-\d{2}-\d{2}$/.test(options.date || "") ? options.date : dateKey(new Date());
    this.resetForm();
  },

  onShow() {
    this.reload();
  },

  reload() {
    this.setData({ anniversaries: sortAnniversaries(readAnniversaries()) });
  },

  onNameInput(event) {
    this.setData({ name: event.detail.value });
  },

  selectType(event) {
    this.setData({ type: event.currentTarget.dataset.type }, () => this.updatePreview());
  },

  onDateChange(event) {
    this.setData({ sourceDate: event.detail.value }, () => this.updatePreview());
  },

  updatePreview() {
    const date = parseDate(this.data.sourceDate);
    const preview = this.data.type === "lunar"
      ? `每年农历 ${lunarLabel(toLunar(date))}`
      : `每年公历 ${date.getMonth() + 1}月${date.getDate()}日`;
    this.setData({ preview });
  },

  saveAnniversary() {
    const name = this.data.name.trim();
    if (!name) {
      wx.showToast({ title: "请输入纪念日名称", icon: "none" });
      return;
    }
    const date = parseDate(this.data.sourceDate);
    const lunar = toLunar(date);
    const existing = this.data.anniversaries.find((item) => item.id === this.data.editingId);
    const now = Date.now();
    const next = normalizeAnniversary({
      ...existing,
      id: existing?.id,
      name,
      type: this.data.type,
      sourceDate: this.data.sourceDate,
      month: this.data.type === "lunar" ? lunar.month : date.getMonth() + 1,
      day: this.data.type === "lunar" ? lunar.day : date.getDate(),
      yearly: true,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    }, now);
    const items = existing
      ? this.data.anniversaries.map((item) => (item.id === existing.id ? next : item))
      : [...this.data.anniversaries, next];
    writeAnniversaries(items);
    this.resetForm();
    this.reload();
    wx.showToast({ title: existing ? "已更新" : "已添加" });
  },

  editAnniversary(event) {
    const item = this.data.anniversaries.find((entry) => entry.id === event.currentTarget.dataset.id);
    if (!item) return;
    this.setData({ editingId: item.id, name: item.name, type: item.type, sourceDate: item.sourceDate }, () => this.updatePreview());
  },

  cancelEdit() {
    this.resetForm();
  },

  deleteAnniversary(event) {
    const id = event.currentTarget.dataset.id;
    wx.showModal({
      title: "删除纪念日",
      content: "确定删除这个纪念日吗？",
      success: ({ confirm }) => {
        if (!confirm) return;
        writeAnniversaries(this.data.anniversaries.filter((item) => item.id !== id));
        if (this.data.editingId === id) this.resetForm();
        this.reload();
      }
    });
  },

  resetForm() {
    this.setData({ editingId: "", name: "", type: "solar", sourceDate: this.defaultDate || dateKey(new Date()) }, () => this.updatePreview());
  }
});
