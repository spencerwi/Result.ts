// Workarounds for lack of types around painless
declare module "painless" {
    function createGroup(): any;
    var assert: any;
}
