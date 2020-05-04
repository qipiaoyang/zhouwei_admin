const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.app.token,
  avatar: state => state.app.avatar,
  admin_id: state => state.app.admin_id,
  name: state => state.app.name,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  errorLogs: state => state.errorLog.logs
}
export default getters
