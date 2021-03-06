const path = require('path');
const apiRoutes = require('./api');
/*const auth = require('./middleware/authorization');*/

// All routes used in application
const useRoutes = function(app) {
	app.use('/api/admin', apiRoutes.adminRoutes);
	app.use('/api/editor', apiRoutes.editorRoutes);
	app.use('/api/commonList', apiRoutes.commonListRoutes);
	app.use('/api/school',apiRoutes.schoolRoutes);
	app.use('/api/staff',apiRoutes.staffRoutes);
	app.use('/api/review',apiRoutes.reviewRoutes);
	// app.use('/api/teacher',apiRoutes.teacherRoutes);
	// app.use('/api/common',apiRoutes.commonRoutes);
};

module.exports = {
	useRoutes : useRoutes
};
