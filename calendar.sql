
SET FOREIGN_KEY_CHECKS=0;

#
# Structure for the `events` table : 
#

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `color` varchar(7) NOT NULL DEFAULT '#3a87ad',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

#
# Data for the `events` table  (LIMIT 0,500)
#

INSERT INTO `events` (`id`, `title`, `description`, `color`, `date`) VALUES 
  (1,'Go Kapa','test mic 12333','#08581c','2020-04-10 15:12:00'),
  (2,'Way Sirado','abc123','#08aaf0','2020-04-12 08:55:46'),
  (3,'Go Corona','the quick brown fox','#08f049','2020-04-14 05:00:52'),
  (4,'Stay Away','jump over the lazy dog','#ddf008','2020-04-15 06:05:44');
COMMIT;
