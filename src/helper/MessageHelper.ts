import { $SpinMV } from "@common/mv/$SpinMV";
import { autowired } from "@core/ioc";
import { message } from "antd";

class MessageHelper {

	@autowired($SpinMV)
	public static $spinMV: $SpinMV;

	public static success = (msg) => {
		message.destroy();
		message.success(msg, 2);
	};

	public static error = (msg) => {
		message.destroy();
		message.error(msg, 2);
	};

	public static loading = (msg?) => {
		MessageHelper.$spinMV.setSpin(true)
	};

	public static hide = () => {
		MessageHelper.$spinMV.setSpin(false)
	};

}

export default MessageHelper;