/**
 * Attaches a timestamp to the original event.
 *
 * @param {*} event The Cloud Functions event.
 * @param {function(*, *)} callback The callback function with
 * optional error and optional response.
 */
 exports.handler = (event, callback) => {
  let text = Buffer.from(event.data, 'base64').toString('ascii');
  const json = JSON.parse(text)
  console.log(`Sending email to: ${json.to} ...`);
};