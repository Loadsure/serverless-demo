const {PubSub} = require('@google-cloud/pubsub');
// Creates a client; cache this for further use
const pubSubClient = new PubSub();

/**
* Attaches a timestamp to the original event.
*
* @param {*} req The Cloud Functions event.
* @param {*} res The callback function with
* optional error and optional response.
*/
exports.handler = async (req, res) => {
  const data = JSON.stringify({paymentType: 'Credit card', to: "eder.diaz@loadsure.net"});
  const dataBuffer = Buffer.from(data);
  try {
    // Sending message to a pub/sub topic
    const messageId1 = await pubSubClient.topic('payments-topic').publish(dataBuffer);
    console.log(`Message ${messageId1} sent to payments...`);
    // Sending message to a pub/sub topic
    const messageId2 = await pubSubClient.topic('emails-topic').publish(dataBuffer);
    console.log(`Message ${messageId2} sent to emails...`);
    res.send({ message: "function executed sucessfully!" })
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    res.status(500).send(error.message)
    process.exitCode = 1;
  }
};