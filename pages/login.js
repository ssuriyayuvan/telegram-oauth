
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div className="flex justify-center mt-10">
				Not logged in to see this
			</div>
		);
	}


	return (
		<div className="flex flex-col items-center mt-10">
			{JSON.stringify(session, null, 2)}
		</div>
	);
}