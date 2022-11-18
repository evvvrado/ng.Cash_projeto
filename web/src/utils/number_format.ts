export function numberFormat(number: any, decimals: any, dec_point: any, thousands_sep: any) {
	number = (number + "").replace(/[^0-9+\-Ee.]/g, "")
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
		dec = typeof dec_point === "undefined" ? "." : dec_point,
		s: any = "",
		toFixedFix = function (n: number, prec: number) {
			var k = Math.pow(10, prec)
			return "" + Math.round(n * k) / k
		}
	s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".")
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	}
	if ((s[1] || "").length < prec) {
		s[1] = s[1] || ""
		s[1] += new Array(prec - s[1].length + 1).join("0")
	}
	return s.join(dec)
}
