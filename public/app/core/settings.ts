export class Settings {
  private oauthUrl: string = "https://app.vssps.visualstudio.com/oauth2/authorize" +
                                "?client_id=45F0722C-BC39-447E-95C1-D3FE9B131C08"+
                                "&response_type=Assertion&state=test" +
                                "&scope=vso.code%20vso.build_execute%20vso.packaging_write%20vso.project_manage%20vso.release_execute%20vso.test%20vso.work_write"+
                                "&redirect_uri=http://127.0.0.1:80/";
  get oAuthUrl():string {
    return this.oauthUrl;
  }

  private applicationUrl: string = "http://vsts-mobile.azurewebsites.net/";
  get ApplicationUrl():string {
    return this.applicationUrl;
  }
}
