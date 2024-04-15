import { redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const target = new URL(request.url);

		target.searchParams.set("imageWidth", data.get("imageWidth"))
		target.searchParams.set("imageHeight", data.get("imageHeight"))
		target.searchParams.set("maxIterations", data.get("maxIterations"))
		target.searchParams.set("threadCount", data.get("threadCount"))
		target.searchParams.set("realCenter", data.get("realCenter"))
		target.searchParams.set("imagCenter", data.get("imagCenter"))
		target.searchParams.set("realWidth", data.get("realWidth"))
		target.searchParams.set("section", data.get("section"))

		throw redirect(303, target)
	}
}
