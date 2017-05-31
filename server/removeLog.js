
import schedule  from 'node-schedule'

import mongokeeper  from './models/mongokeeper'
import Setting from './models/remove_log__setting_model'
import LogModel from './models/log_model'
import config from './config'

// process.env.MONGO_DB_STR = config.devDbUrl;//config.dbConfig;
mongokeeper.config(config.dbConfig);
const rule = new schedule.RecurrenceRule();

rule.hour = 0;
rule.minute = 0;
rule.dayOfWeek = 0;

let run = schedule.scheduleJob(rule, function(){
    autoRun();
});

function autoRun () {

    Setting.find({}, {'_id': 0, '__v': 0}).exec( (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (result && result.length) {
                let expired = +result[0].expiredTime;
                let deadline = Date.now() - expired * 1000;
                let condition = {
                    'create_time': {
                        '$lt': deadline
                    }
                };
                LogModel.remove(condition, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                });
            }
        }
    });
}
