const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "simple-app",
  brokers: ["127.0.0.1:9092"],
});
async function consume() {
  const consumer = kafka.consumer({
    groupId: "splitter",
  });
  await consumer.connect();
  console.log("Connected");
  await consumer.subscribe({ topic: "splitter", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `- topic: ${topic} - partition: ${partition} - number: ${message.value}`
      );
    },
  });
  // await consumer.disconnect()
}

consume();
