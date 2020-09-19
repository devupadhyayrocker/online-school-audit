const path = require('path');
const apiRoutes = require('./api');
/*const auth = require('./middleware/authorization');*/

// All routes used in application
const useRoutes = function(app) {
	app.use('/api/user', apiRoutes.userRoutes);
	/*app.use('/api/admin', apiRoutes.adminRoutes);
	app.use('/api/broadcast',apiRoutes.broadcastRoutes);
	app.use('/api/teacher',apiRoutes.teacherRoutes);
	app.use('/api/common',apiRoutes.commonRoutes);*/
};

module.exports = {
	useRoutes : useRoutes
};