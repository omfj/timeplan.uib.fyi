CREATE TABLE `course` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner_id` text NOT NULL,
	`year_from` integer,
	`year_to` integer,
	`metadata` blob
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `course` (`name`);