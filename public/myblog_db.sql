/*
 Navicat Premium Data Transfer

 Source Server         : localhost3316
 Source Server Type    : MySQL
 Source Server Version : 110300 (11.3.0-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : myblog_db

 Target Server Type    : MySQL
 Target Server Version : 110300 (11.3.0-MariaDB)
 File Encoding         : 65001

 Date: 17/06/2024 01:59:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `roleId` int NULL DEFAULT NULL,
  `statusId` int NULL DEFAULT NULL,
  `passwordTemp` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be`(`email` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('339a0887-aaac-4991-8a40-d08fe0b44546', 'kongnakorn@gmail.com', '$2b$10$Kf1Eq5pwXpW4yoLvOvpOOucWzrEkcdsFc.DWqarC6lJl22dlNrE7O', '2024-06-16 21:28:44.579985', '2024-06-16 21:35:47.154404', 1, 1, 'Pass#123');
INSERT INTO `users` VALUES ('439747f1-d707-4da6-b42b-3d082631dc00', 'Admin@gmail.com', '$2b$10$ZzFyCjg2jOb3dbSg2pr6cuPQmnkX3SnEjBPz/rkvMG3iCsufQ8bGm', '2024-06-16 17:32:37.497909', '2024-06-16 21:35:48.879733', 3, 1, 'Pass#123');
INSERT INTO `users` VALUES ('e55289ba-ff5e-49d5-9c16-38305bf4af60', 'kongnakornna@gmail.com', '$2b$10$W9d7DbwuatVruCcY2Sgc4egPvftQhF0sP5hmoFEseZGBLfe1g8IvW', '2024-06-16 21:36:34.060663', '2024-06-16 21:36:34.060663', 1, 1, 'Na@0955@#@#');

SET FOREIGN_KEY_CHECKS = 1;
