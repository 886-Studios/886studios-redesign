interface DeploymentEnvironment {
  PROD?: boolean;
  VERCEL?: string;
  VERCEL_ENV?: string;
}

export function isProductionDeployment(environment: DeploymentEnvironment) {
  return environment.PROD === true &&
    environment.VERCEL === "1" &&
    environment.VERCEL_ENV === "production";
}
