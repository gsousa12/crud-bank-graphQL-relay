import { getDataloaders } from "../modules/loader/loaderRegister";

type KoaContext = { state?: { user?: any } };

const getContext = (ctx?: KoaContext) => {
  const dataloaders = getDataloaders();

  return {
    dataloaders,
    user: ctx?.state?.user ?? null,
  } as const;
};

export { getContext };
