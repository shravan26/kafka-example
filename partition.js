const { Kafka } = require("kafkajs");

async function createPartition() {
  const kafka = new Kafka({
    clientId: "simple-app",
    brokers: ["127.0.0.1:9092"],
  });
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: "splitter",
        numPartitions: 2,
      },
    ],
  });
  console.log("Created 2 partitions");
  await admin.disconnect();
}

createPartition();
