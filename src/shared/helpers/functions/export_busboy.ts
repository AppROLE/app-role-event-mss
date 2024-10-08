import Busboy from "busboy";
import fs from "fs"; 

export async function parseMultipartFormData(
  request: Record<string, any>
): Promise<Record<string, any>> {
  const contentType =
    request.headers["content-type"] || request.headers["Content-Type"];

  if (!contentType || !contentType.includes("multipart/form-data")) {
    throw new Error("Content-Type da requisição não é multipart/form-data");
  }

  const contentLength =
    request.headers["content-length"] || request.headers["Content-Length"];

  console.log("Content-Length:", contentLength);

  const busboy = Busboy({
    headers: {
      "content-type": contentType,
      "content-length": contentLength,
    },
  });

  const result: Record<string, any> = {
    files: [],
    fields: {},
  };

  return new Promise((resolve, reject) => {
    busboy.on("file", (fieldname: any, file: any, infos: any) => {
      console.log("Form-data info: ", infos);
      const { filename, encoding, mimeType } = infos;
      console.log(
        `Recebendo arquivo: ${fieldname} (${filename}) com mimetype: ${mimeType}`
      );

      file.setEncoding("binary");

      const chunks: Buffer[] = [];

      file.on("data", (chunk: Buffer) => {
        console.log(`Recebendo dados do arquivo: ${filename}`);
        chunks.push(Buffer.from(chunk));
      });

      file.on("end", () => {
        const completeFile = Buffer.concat(chunks);
        console.log(
          `Arquivo recebido: ${filename}, tamanho: ${completeFile.length} bytes`
        );

        const tmpFilePath = `/tmp/${filename}`;
        fs.writeFileSync(tmpFilePath, completeFile);
        console.log(
          `Arquivo salvo temporariamente para depuração em: ${tmpFilePath}`
        );

        result.files.push({
          fieldname,
          filename,
          encoding,
          mimeType,
          data: completeFile,
        });
      });
    });

    busboy.on("field", (fieldname: any, val: any) => {
      console.log(`Recebendo campo: ${fieldname} com valor: ${val}`);
      result.fields[fieldname] = val;
    });

    busboy.on("finish", () => {
      console.log("Parse do form-data finalizado.");
      resolve(result);
    });

    busboy.on("error", (error: any) => {
      console.error("Erro no parse do form-data:", error);
      reject(error);
    });

    console.log("IS BASE 64 ENCODED?", request.isBase64Encoded);

    const body = request.isBase64Encoded
      ? Buffer.from(request.body, "base64")
      : request.body;

    busboy.end(body);
  });
}
