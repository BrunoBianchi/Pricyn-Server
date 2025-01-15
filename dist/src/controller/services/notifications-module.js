"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const data_source_1 = require("../../database/data-source");
const Notifications_1 = require("../../database/entity/Notifications");
class NotificationsModule {
    async addNotification(notification) {
        const obj = data_source_1.AppDataSource.manager.create(Notifications_1.Notifications, notification);
        return await data_source_1.AppDataSource.manager.save(obj);
    }
    async notificationExists(uid) {
        return await data_source_1.AppDataSource.manager.findOneBy(Notifications_1.Notifications, { uid });
    }
    async getUserNotifications(userUid) {
        return await data_source_1.AppDataSource.manager.findBy(Notifications_1.Notifications, { userUid });
    }
}
exports.NotificationsModule = NotificationsModule;
exports.default = new NotificationsModule();
//# sourceMappingURL=notifications-module.js.map