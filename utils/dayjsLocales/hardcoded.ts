import af from 'dayjs/locale/af';
import am from 'dayjs/locale/am';
import ar from 'dayjs/locale/ar';
import az from 'dayjs/locale/az';
import be from 'dayjs/locale/be';
import bg from 'dayjs/locale/bg';
import bi from 'dayjs/locale/bi';
import bm from 'dayjs/locale/bm';
import bn from 'dayjs/locale/bn';
import bo from 'dayjs/locale/bo';
import br from 'dayjs/locale/br';
import bs from 'dayjs/locale/bs';
import ca from 'dayjs/locale/ca';
import cs from 'dayjs/locale/cs';
import cv from 'dayjs/locale/cv';
import cy from 'dayjs/locale/cy';
import da from 'dayjs/locale/da';
import de from 'dayjs/locale/de';
import dv from 'dayjs/locale/dv';
import el from 'dayjs/locale/el';
import en from 'dayjs/locale/en';
import eo from 'dayjs/locale/eo';
import es from 'dayjs/locale/es';
import et from 'dayjs/locale/et';
import eu from 'dayjs/locale/eu';
import fa from 'dayjs/locale/fa';
import fi from 'dayjs/locale/fi';
import fo from 'dayjs/locale/fo';
import fr from 'dayjs/locale/fr';
import fy from 'dayjs/locale/fy';
import ga from 'dayjs/locale/ga';
import gd from 'dayjs/locale/gd';
import gl from 'dayjs/locale/gl';
import gu from 'dayjs/locale/gu';
import he from 'dayjs/locale/he';
import hi from 'dayjs/locale/hi';
import hr from 'dayjs/locale/hr';
import ht from 'dayjs/locale/ht';
import hu from 'dayjs/locale/hu';
import id from 'dayjs/locale/id';
import is from 'dayjs/locale/is';
import it from 'dayjs/locale/it';
import ja from 'dayjs/locale/ja';
import jv from 'dayjs/locale/jv';
import ka from 'dayjs/locale/ka';
import kk from 'dayjs/locale/kk';
import km from 'dayjs/locale/km';
import kn from 'dayjs/locale/kn';
import ko from 'dayjs/locale/ko';
import ku from 'dayjs/locale/ku';
import ky from 'dayjs/locale/ky';
import lb from 'dayjs/locale/lb';
import lo from 'dayjs/locale/lo';
import lt from 'dayjs/locale/lt';
import lv from 'dayjs/locale/lv';
import me from 'dayjs/locale/me';
import mi from 'dayjs/locale/mi';
import mk from 'dayjs/locale/mk';
import ml from 'dayjs/locale/ml';
import mn from 'dayjs/locale/mn';
import mr from 'dayjs/locale/mr';
import ms from 'dayjs/locale/ms';
import mt from 'dayjs/locale/mt';
import my from 'dayjs/locale/my';
import nb from 'dayjs/locale/nb';
import ne from 'dayjs/locale/ne';
import nl from 'dayjs/locale/nl';
import nn from 'dayjs/locale/nn';
import pl from 'dayjs/locale/pl';
import pt from 'dayjs/locale/pt';
import ro from 'dayjs/locale/ro';
import ru from 'dayjs/locale/ru';
import rw from 'dayjs/locale/rw';
import sd from 'dayjs/locale/sd';
import se from 'dayjs/locale/se';
import si from 'dayjs/locale/si';
import sk from 'dayjs/locale/sk';
import sl from 'dayjs/locale/sl';
import sq from 'dayjs/locale/sq';
import sr from 'dayjs/locale/sr';
import ss from 'dayjs/locale/ss';
import sv from 'dayjs/locale/sv';
import sw from 'dayjs/locale/sw';
import ta from 'dayjs/locale/ta';
import te from 'dayjs/locale/te';
import tg from 'dayjs/locale/tg';
import th from 'dayjs/locale/th';
import tk from 'dayjs/locale/tk';
import tr from 'dayjs/locale/tr';
import uk from 'dayjs/locale/uk';
import ur from 'dayjs/locale/ur';
import uz from 'dayjs/locale/uz';
import vi from 'dayjs/locale/vi';
import yo from 'dayjs/locale/yo';
import zh from 'dayjs/locale/zh';

export const DayJSLocales = {
	af,
	am,
	ar,
	az,
	be,
	bg,
	bi,
	bm,
	bn,
	bo,
	br,
	bs,
	ca,
	cs,
	cv,
	cy,
	da,
	de,
	dv,
	el,
	en,
	eo,
	es,
	et,
	eu,
	fa,
	fi,
	fo,
	fr,
	fy,
	ga,
	gd,
	gl,
	gu,
	he,
	hi,
	hr,
	ht,
	hu,
	id,
	is,
	it,
	ja,
	jv,
	ka,
	kk,
	km,
	kn,
	ko,
	ku,
	ky,
	lb,
	lo,
	lt,
	lv,
	me,
	mi,
	mk,
	ml,
	mn,
	mr,
	ms,
	mt,
	my,
	nb,
	ne,
	nl,
	nn,
	pl,
	pt,
	ro,
	ru,
	rw,
	sd,
	se,
	si,
	sk,
	sl,
	sq,
	sr,
	ss,
	sv,
	sw,
	ta,
	te,
	tg,
	th,
	tk,
	tr,
	uk,
	ur,
	uz,
	vi,
	yo,
	zh,
};

export function loadDayJsLocale(alpha2code: string) {
	let locale = DayJSLocales[alpha2code];
	if (!locale) {
		return DayJSLocales['en'];
	}
	return locale;
}
