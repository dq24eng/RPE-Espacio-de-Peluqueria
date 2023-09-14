import twilio from "twilio";
import config from "../config/enviroment.config.js";

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

const sendMessage = async (ticket) => {
	try {
		const userPhone = ticket.purchaser.phone;
		if(!userPhone) return `User doesn't have a phone to send the message.`
		const orderCode = ticket.code;
		const orderAmount = ticket.amount;
		await client.messages.create({
			body: `Your order was processed. Order code: ${orderCode}. Total: $${orderAmount}.`,
			from: config.TWILIO_PHONE_NUMBER,
			to: userPhone
		}).then(message => console.log(message.sid));
	} catch (error) {
		return `Error: ${error}`
	}
}

export default sendMessage;