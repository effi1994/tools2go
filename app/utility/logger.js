import Bugsnag from '@bugsnag/expo';

const logger = (error) => {
       Bugsnag.notify(error);
       console.log(error);
}

const start = () =>  Bugsnag.start();

export default {
       start,
       log: logger
};
