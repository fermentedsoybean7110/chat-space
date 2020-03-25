# README

## usersテーブル

|Column|Type|options|
|:----:|:--:|:-----:|
|id|integer|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :messages
- has_mamy :groups, through: users_groups
- has_many :users_groups

## messagesテーブル
|Column|Type|options|
|:----:|:--:|:-----:|
|id|integer|
|text|string|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|options|
|:----:|:--:|:-----:|
|id|integer|
|name|string|null: false|

### Association
- has_many :messages
- has_mamy :users, through: users_groups
- has_many :users_groups

## users_groupsテーブル
|Column|Type|options|
|:----:|:--:|:-----:|
|id|integer|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group