import { PUBLIC_BACKEND_URL } from "$env/static/public";

/** @type {import("./$types").PageServerLoad} */
export async function load({ url, fetch }) {
	const config = {
		imageWidth: +url.searchParams.get("imageWidth") || 800,
		imageHeight: +url.searchParams.get("imageHeight") || 600,
		maxIterations: +url.searchParams.get("maxIterations") || 10_000,
		threadCount: +url.searchParams.get("threadCount") || 100,
		realCenter: +url.searchParams.get("realCenter") || -0.7,
		imagCenter: +url.searchParams.get("imagCenter") || 0,
		realWidth: +url.searchParams.get("realWidth") || 3.0769,
		section: url.searchParams.get("section") || "original",
	}

	const mandelbrotRequest = async () => {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/generateMandelbrot`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(config),
		})
		const data = await res.arrayBuffer();

		return URL.createObjectURL(new Blob([data], { type: "image/png" }))
	}

	return {
		mandelbrotImage: await mandelbrotRequest(),
		config,
	}
}

