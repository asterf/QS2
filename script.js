javascript: (async ()=>{
  try{
    if(!(/^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}|\S*\.local))\S*$/.test(location.href))){
      throw new Error("This script must be excuted in 'https' or 'localhost'.");
    }
    for(let key of [
      "window",
      "ArrayBuffer",
      "DataView",
      "Uint8Array",
      "crypto",
      "BigInt"
    ]){
      if(!globalThis?.[key]){
        throw new Error(`This script depends 'globalThis.${key}' but it's not found.`);
      }
    }
    if(!globalThis?.crypto?.subtle){
      throw new Error("This script depends 'globalThis.crypto.subtle' but it's not found.");
    }
    let seed=prompt("qs2 ?> Enter your seed here:");
    if (!seed || /[^A-Z2-7=]/i.test(seed.replace(/\s/g, ""))){
      throw new Error("Invalid Base32 Seed");
    }
    let HTYPE=prompt("qs2 ?> Enter hash type below(empty for continue with 'SHA-1'): \n")||"SHA-1";
    alert("qs2 *> Auth Key:"+await (async secret=>{
      const buf = new ArrayBuffer(8);
      new DataView(buf).setBigUint64(0, BigInt(Math.floor(Date.now() / 30000)), false);
      const hmac = new Uint8Array(await crypto.subtle.sign("HMAC", (await crypto.subtle.importKey(
        "raw", 
        (function base32(t){
          let r = 0,
            b = 0,
            o = [];
          for (let c of t.toUpperCase()) {
            if (c === "=") break;
            let v = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(c);
            if (v < 0) continue;
            r = (r << 5) | v;
            b += 5;
            if (b >= 8) {
              b -= 8;
              o.push((r >> b) & 255);
              r &= (1 << b) - 1;
            }
          }
          return new Uint8Array(o);
        })(secret),
        {name:"HMAC",hash:HTYPE},
        false,
        ["sign"]
      )), buf));
      const offset = hmac[hmac.length - 1] & 0xf;
      return ((((hmac[offset] & 0x7f) << 24) | (hmac[offset + 1] << 16) | (hmac[offset + 2] << 8) | hmac[offset + 3]) % 1000000).toString().padStart(6, "0");
    })(seed));
  }catch(e){
    alert("qs2 !> Error Occurred:"+e)
  }
})();
