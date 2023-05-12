import {
  Application,
  Context,
  Router,
  send,
} from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { Status } from "https://deno.land/std@0.185.0/http/http_status.ts";
import {
  render_chinese,
  render_chinese_error,
  render_classical,
  render_classical_error,
} from "./rend.js";
import update from "./update.js";

const api_endpoint = Deno.env.get("API_ENDPOINT");
const sign_key = Deno.env.get("SIGN_KEY");

if (api_endpoint == null || sign_key == null) {
  throw new Error("Env null!");
}

const router = new Router();

router.get("/favicon.ico", async (ctx) => {
  await send(ctx, "/static/img/favicon.ico", { root: Deno.cwd() });
});

router.get("/", async (ctx) => {
  try {
    const ALL_INFOMATION = await update(api_endpoint, sign_key);
    if (ALL_INFOMATION == null) {
      console.log("Error: ALL_INFORMATION NULL");
      throw new Error("Error: ALL_INFORMATION NULL");
    }
    ctx.response.body = await render_chinese(ALL_INFOMATION);
  } catch {
    ctx.response.body = render_chinese_error("Something Wrong");
  }
});

router.get("/test_endpoint", async (ctx) => {
  const ALL_INFOMATION = await update(api_endpoint, sign_key);
  if (ALL_INFOMATION == null) {
    console.log("Error: ALL_INFORMATION NULL");
    throw new Error("Error: ALL_INFORMATION NULL");
  }
  ctx.response.body = await render_chinese(ALL_INFOMATION);
});

router.get("/classical", async (ctx) => {
  try {
    const ALL_INFOMATION = await update(api_endpoint, sign_key);
    if (ALL_INFOMATION == null) {
      console.log("Error: ALL_INFORMATION NULL");
      throw new Error("Error: ALL_INFORMATION NULL");
    }
    ctx.response.body = await render_classical(ALL_INFOMATION);
  } catch {
    ctx.response.body = await render_classical_error("Something Wrong");
  }
});

router.get("/api/get_status", async (ctx) => {
  ctx.response.headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
  });
  try {
    const ALL_INFOMATION = await update(api_endpoint, sign_key);
    if (ALL_INFOMATION == null) {
      console.log("Error: ALL_INFORMATION NULL");
      throw new Error("Error: ALL_INFORMATION NULL");
    }
    ctx.response.body = JSON.stringify(ALL_INFOMATION);
  } catch {
    ctx.response.body = {
      status_code: 5000,
      status_text: "Something went wrong.",
    };
    ctx.response.status = 500;
  }
});

router.get("/static/:path+", async (ctx) => {
  async function checkFileExist(ctx: Context) {
    const path = `${Deno.cwd()}/${ctx.request.url.pathname}`;
    try {
      const fileInfo = await Deno.lstat(path);
      return fileInfo.isFile;
    } catch {
      console.log(path);
      return false;
    }
  }

  if (await checkFileExist(ctx)) {
    await send(ctx, ctx.request.url.pathname, {
      root: Deno.cwd(),
    });
  } else {
    ctx.response.body = "404 Error";
    ctx.response.status = Status.NotFound;
  }
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: 8000 });