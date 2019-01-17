const axios = require('axios');
const uuidv4 = require('uuid/v4');

const { ES_URL, ES_INDEX, ES_CREDENTAILS } = require('./config')
const data = require('./sample.json');

const bulkRequest = async () => {
  try {
    let requestData = '';

    data.forEach((item) => {
      const id = uuidv4();
      const esType = 'doc'

      requestData += JSON.stringify({
        index: { _id: uuidv4(), _type: esType }
      });
      requestData += '\n';
      requestData += JSON.stringify(item);
      requestData += '\n';
    });

    const bulkRes = await axios.post(`${ES_URL}/${ES_INDEX}/_bulk`, requestData, {
      headers: {
        Authorization: `Basic ${Buffer.from(ES_CREDENTAILS, 'binary').toString('base64')}`
      }
    });

    console.log('----------------- BULK RESPONSE -----------------');
    console.log(JSON.stringify(bulkRes.data, null, 2));

  } catch (err) {
    console.error(err);
  }
};

bulkRequest();
