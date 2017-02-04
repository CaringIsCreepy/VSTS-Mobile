export class Settings {
  private oauthUrl: string = "https://app.vssps.visualstudio.com/oauth2/authorize" +
                                "?client_id=9FB50045-88AF-4900-9452-46D1B188C5AA"+
                                "&response_type=Assertion&state=test" +
                                "&scope="+
"vso.agentpools_manage%20vso.build_execute%20vso.code_manage%20vso.connected_server%20vso.dashboards_manage%20vso.entitlements%20vso.extension.data_write%20vso.extension_manage%20vso.gallery_acquire%20vso.identity%20vso.loadtest_write%20vso.packaging_write%20vso.profile_write%20vso.project_manage %20vso.release_manage%20vso.test_write%20vso.work_write"+
                                "&redirect_uri=https://192.168.86.105";
  get oAuthUrl():string {
    return this.oauthUrl;
  }

  private applicationUrl: string = "http://127.0.0.1:80/";
  get ApplicationUrl():string {
    return this.applicationUrl;
  }

  private redirectBaseUrl: string = "http://192.168.86.105/";
  get RedirectBaseUrl():string {
    return this.redirectBaseUrl;
  }
}
