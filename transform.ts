import { existsSync, mkdirSync } from "node:fs"
import Sharp from "sharp"
import gallery from "./src/components/gallery.json"

const inDir = "./public/galleryhq"
const outDir = "./public/gallery"

if (!existsSync(outDir)) mkdirSync(outDir)

const size = 400

async function transform(filename: string) {
	await Sharp(`${inDir}/${filename}.jpg`)
		.rotate() // rotate based on metadata
		.resize(size, size)
		.avif({ effort: 1 }) // effort just makes it worse??
		// .webp({ quality: 50 })
		.toFile(`${outDir}/${filename}.avif`)

	console.log(`Transformed: ${filename}`)
}

const start = Date.now()

await Promise.all(gallery.map(item => transform(item.Filename)))

console.log(`Done in ${(Date.now() - start) / 1000} seconds`)
