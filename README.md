# Install kafka
# Then run below cmd
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties
# To create topic in kafka
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic Posts
# To check List of Topics in to kafka
bin/kafka-topics.sh --list --zookeeper localhost:2181
# To Produce Message into kafka
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic Posts
# To consume Message from kafka
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic Posts --from-beginning
# Then Run node producer.js
http://localhost:5001 # To check 
http://localhost:5001/sendMsg # Post Message
# Body in application/json Format
{ 
	"topic":"Posts",
	"message": "Kafka working with nodejs"
}
# node consumer.js
