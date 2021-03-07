CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  active BOOLEAN DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `tweets` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int(11) NOT NULL,
  parentId int(11),
  content varchar(255) NOT NULL,
  isRetweet BOOLEAN DEFAULT false,
  createTime datetime DEFAULT now(),
  updateTime datetime DEFAULT now()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `likes` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int(11) NOT NULL,
  tweetId int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
