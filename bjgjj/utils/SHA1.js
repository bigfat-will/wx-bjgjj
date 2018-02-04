/******* SHA1 ******/
function hex_sha1(r) {
    return binb2hex(core_sha1(AlignSHA1(r)))
}
function sha1_vm_test() {
    return "a9993e364706816aba3e25717850c26c9cd0d89d" == hex_sha1("abc")
}
function core_sha1(r) {
    for (var e = r,
    t = Array(80), n = 1732584193, a = -271733879, h = -1732584194, d = 271733878, c = -1009589776, f = 0; f < e.length; f += 16) {
        for (var o = n,
        i = a,
        _ = h,
        m = d,
        g = c,
        s = 0; 80 > s; s++) {
            t[s] = 16 > s ? e[f + s] : rol(t[s - 3] ^ t[s - 8] ^ t[s - 14] ^ t[s - 16], 1);
            var l = safe_add(safe_add(rol(n, 5), sha1_ft(s, a, h, d)), safe_add(safe_add(c, t[s]), sha1_kt(s)));
            c = d,
            d = h,
            h = rol(a, 30),
            a = n,
            n = l
        }
        n = safe_add(n, o),
        a = safe_add(a, i),
        h = safe_add(h, _),
        d = safe_add(d, m),
        c = safe_add(c, g)
    }
    return new Array(n, a, h, d, c)
}
function sha1_ft(r, e, t, n) {
    return 20 > r ? e & t | ~e & n: 40 > r ? e ^ t ^ n: 60 > r ? e & t | e & n | t & n: e ^ t ^ n
}
function sha1_kt(r) {
    return 20 > r ? 1518500249 : 40 > r ? 1859775393 : 60 > r ? -1894007588 : -899497514
}
function safe_add(r, e) {
    var t = (65535 & r) + (65535 & e),
    n = (r >> 16) + (e >> 16) + (t >> 16);
    return n << 16 | 65535 & t
}
function rol(r, e) {
    return r << e | r >>> 32 - e
}
function AlignSHA1(r) {
    for (var e = (r.length + 8 >> 6) + 1, t = new Array(16 * e), n = 0; 16 * e > n; n++) t[n] = 0;
    for (n = 0; n < r.length; n++) t[n >> 2] |= r.charCodeAt(n) << 24 - 8 * (3 & n);
    return t[n >> 2] |= 128 << 24 - 8 * (3 & n),
    t[16 * e - 1] = 8 * r.length,
    t
}
function binb2hex(r) {
    for (var e = hexcase ? "0123456789ABCDEF": "0123456789abcdef", t = "", n = 0; n < 4 * r.length; n++) t += e.charAt(15 & r[n >> 2] >> 8 * (3 - n % 4) + 4) + e.charAt(15 & r[n >> 2] >> 8 * (3 - n % 4));
    return t
}
var hexcase = 0,
chrsz = 8;