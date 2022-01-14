const {PubSub} = require('@google-cloud/pubsub');
// Creates a client; cache this for further use
const pubSubClient = new PubSub();

/**
 * Attaches a timestamp to the original event.
 *
 * @param {*} event The Cloud Functions event.
 * @param {function(*, *)} callback The callback function with
 * optional error and optional response.
 */
exports.handler = (event, callback) => {
  // Receiving event from pub/sub server
  let text = Buffer.from(event.data, 'base64').toString('ascii');
  const json = JSON.parse(text)
  console.log(`Performing ${json.paymentType} payment!`);
};