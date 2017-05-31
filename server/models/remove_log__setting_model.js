
/**
 * 清除日志设置表
 */

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

var settingSchema = new Schema({
    id: Number,
    expiredTime: Number,
	createAt: Number,
});

 // db.settings.insert({
 //    "id": 1,
 //    "expiredTime": 604800,
 //    "createAt" : new Date()
 // })



settingSchema.pre('save', function(next) {

  if (this.isNew) {
    this.createAt = Date.now()
  }

  next()
})

export default mongoose.model('Setting', settingSchema)


