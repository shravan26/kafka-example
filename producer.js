const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "simple-app",
  brokers: ["127.0.0.1:9092"],
});
async function produce() {
  const producer = kafka.producer();
  await producer.connect();
  console.log("Connected");

  const num = process.argv[2];

  const dataSent = await producer.send({
    topic: "splitter",
    messages: [
      {
        value: num,
        partition: num % 2 === 0 ? 0 : 1,
      },
    ],
  });

  await producer.disconnect();
}
produce();
