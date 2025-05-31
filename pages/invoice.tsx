import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InfoMobile from '@/components/InfoMobile';
import Info from '@/components/Info';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setItems, setTotalAmount, setTotalQuantity } from '../src/redux/slices/checkoutSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// Myanmar cities list for autocomplete
const myanmarCities = [
  // Ayeyarwady Region
  'ပုသိမ်', '၀ါးခယ်မ', 'သာပေါင်း', 'အမာ', 'ညောင်တုန်း', 'ဘိုကလေး', 'ငွေဆောင်', 
  'လေးမျက်နှာ', 'ရေကြည်', 'ကျောင်းကုန်း', 'ဒေးဒရဲ', 'ကျူံပျော်', 'အင်္ဂပူ', 'ဇလွန်', 
  'ကြံခင်း', 'ကျိူက်လတ်', 'ပန်းတနော်', 'ဒူးယား', 'ချောင်းသာ', 'အိမ်မဲ', 'မြန်အောင်', 
  'မအူပင်', 'ကန်ကြီးထောင့်', 'ငပုတော', 'ဟင်္သာတ', 'လပွတ္တာ', 'မြောင်းမြ', 'ဖျာပုံ',

  // Bago Region
  'ပဲခူး', 'ရွှေတောင်', 'ဇီးကုန်း', 'လက်ပံတန်း', 'မင်းလှ', 'ကျောက်ကြီး', 'အုတ်ဖို', 
  'မိုးညို', 'ပေါင်းတည်', 'အုတ်တွင်း', 'က၀', 'ရေတာရှည်', 'ရွှေကျင်', 'သနပ်ပင်', 'ဖြူး', 
  'ပေါက်ခေါင်း', 'ပန်းတောင်း', 'ကြို့ပင်ကောက်', 'ဒိုက်ဦး', 'ကျောက်တံခါး', 'ပြွန်တန်ဆာ', 
  'ပြည်', 'သာယာ၀တီ', 'ညောင်လေးပင်', 'နတ်တလင်း', 'တောင်ငူ',

  // Chin State
  'ဟားခါး', 'မတူပီ', 'ကန်ပက်လက်', 'ကျီခါး', 'ဖလမ်း', 'မင်းတပ်', 'ကလေး', 'ပလက်၀', 
  'ထန်တလန်', 'တွန်းဇံ', 'တီးတိန်',

  // Kachin State
  'မန်စီ', '၀ိုင်းမော်', 'ဆဒေါင်', 'ရှင်ဗွေယန်', 'လွယ်ဂျယ်', 'မိုးမောက်', 'ပူတာအို', 
  'မြစ်ကြီးနား', 'တနိုင်း', 'ရွှေကူ', 'မိုးညှင်း', 'ဖားကန့်', 'ဗန်းမော်', 'မိုးကောင်း', 
  'ကာမိုင်း', 'အင်းတော်', 'မချမ်းဘော', 'ဟိုပင်',

  // Kayah State
  'လွိုင်ကော်', 'မယ်စဲ့', 'ဖရူဆို', 'ဘော်လခဲ', 'ဖားဆောင်း', 'ရှားတော', 'ဒီမောဆို',

  // Kayin State
  'ဖားအံ', 'သံတောင်ကြီး', 'မြ၀တီ', 'ကမမောင်း', 'မာနယ်ပလော', 'ကော့ကရိတ်', 'ဘီးလင်း', 
  'လှိုင်းဘွဲ့', 'ဘုရားသုံးဆူ', 'ရှမ်းရွာသစ်', 'ကြာအင်းဆိပ်ကြီး', 'ဖာပွန်',

  // Magway Region
  'မကွေး', 'မင်းဘူး', 'သရက်', 'တောင်တွင်းကြီး', 'နက်မောက်', 'ဂန့်ဂေါ', 'ငဖဲ', 'ချောက်', 
  'ဗိဿနိုး', 'မင်းတုန်း ', 'ပခုက္ကူ', 'အောင်လံ', 'စလင်း', 'ပွင့်ဖြူ', 'ဆော', 'ရေနံချောင်း', 
  'မြိုင်', 'ပေါက်', 'ကျောက်ထု', 'မြို့သစ်', 'ရေစကြို', 'စလေ', 'ထီးလင်း',

  // Mandalay Region
  'မန္တလေး', 'မိတ္ထီလာ', 'မတ္တရာ', 'ပုဂံ မြို့ဟောင်း', 'မိုးကုတ်', 'Mahlaing', 'အင်း၀', 
  'ကျောက်ပန်းတောင်း', 'ညောင်ဦး', 'ပြင်ဦးလွင်', 'မြစ်သား', 'မြင်းခြံ', 'သပိတ်ကျဥ်း', 
  '၀မ်းတွင်း', 'ပျော်ဘွယ်', 'တောင်သာ', 'နွားထိုးကြီး', 'ဆိပ်ဖြူ', 'ရမည်းသင်း', 'တံတားဦး', 
  'စဥ့်ကူ', 'စဥ့်ကိုင်', 'ကျောက်ဆည်', 'တကောင်း', 'သာစည်',

  // Mon State
  'မော်လမြိုင်', 'ကျိုက်ထို', 'ရေး', 'မုဒုံ', 'ပေါင်', 'သံဖြူဇရပ်', 'မုတ္တမ', 'ကျိူက်မရော', 
  'သထုံ', 'ကျိုက္ခမီ', 'ချောင်းဆုံ',

  // Rakhine State
  'စစ်တွေ', 'ဘူးသီးတောင်', 'မာန်အောင်', 'ရသေ့တောင်', '၀ေသာလီ', 'တောင်ကုတ်', 'မြောက်ဦး', 
  'မင်းပြား', 'မြေပုံ', 'မောင်တော', 'သံတွဲ', 'အမ်း', 'ပုဏ္ဏားကျွန်း', 'ရမ်းဗြဲ', 'ဓည၀တီ', 
  'ကျော်တော်',

  // Sagaing Region
  'စစ်ကိုင်း', 'တမူး', 'ယင်းမာပင်', 'လေရှီး', 'ကသာ', 'မြင်းမူ', 'ကနီ', 'လဟယ်', '၀က်လက်', 
  'ခန္တီး', 'ချောင်းဦး', 'မုံရွာ', '၀န်းသို', 'ကန့်ဘလူ', 'နန်းယွန်း', 'ဟုမ္မလင်း', 'မော်လိုက်', 
  'ရေဦး', 'ရွှေဘို', 'ထီးချိူင့်', 'ပင်လည်ဘူး', 'ခင်ဦး', 'တန့်ဆည်', 'ဖောင်းပြင်', 'ကောလင်း', 
  'အရာတော်', 'မင်းကွန်း', 'ဘုတလင်', 'ဆားတောင်', 'ဗမောက်', 'ဆားလင်းကြီး',

  // Shan State
  'ရွာငံ', 'ကလော', 'ပင်းတယ', 'လောက်ကိုင်', 'မိုင်းလား', 'မိုင်းဖြတ်', 'ညောင်ရွှေ', 'မောက်မယ်', 
  'တန့်ယန်း', 'ကွန်ဟိန်း', 'ရပ်စောက်', 'နမ့်မတူ', 'တောင်ကြီး', 'ကျိုင်းတုံ', 'တာချီလိတ်', 
  'မိုးမိတ်', 'မုန်းကိုး', 'နမ့်ခမ်း', 'ကျောက်မဲ', 'နမ့်စန်', 'မန်တုံ', 'ကွတ်ခိုင်', 'လဲချား', 
  'ပန်ဆန်း', 'မိုင်းတုံ', 'ပင်လုံ', 'မူဆယ်', 'မိုးနဲ', 'မိုင်းပန်', 'မိုင်းရှူး', 'အောင်ပန်း', 
  'ပင်လောင်း', 'ပေါင်းလောင်း', 'နောင်တရား', 'ဟိုပုံး', 'မိုင်းဆတ်', 'လားရှိုး', 'မိုင်းရယ်', 
  'မိုင်းမော', 'ဟိုပန်', 'ပန်၀ိုင်', 'ပန်လုံ', 'မက်မန်း', 'နားဖန်း', 'သီပေါ', 
  'သန္နီ', 'ဆီဆိုင်', 'နောင်ချိူ', 'လွိုင်လင်', 'ကွမ်းလုံ',

  // Tanintharyi Region
  'ဘုတ်ပြင်း', 'ကျွန်းစု', 'ပုလော', 'ထား၀ယ်', 'လောင်းလုံ', 'သရက်ချောင်း', 'မြိတ်', 
  'ကော့သောင်း', 'ရေဖြူ',

  // Yangon Region
  'ရန်ကုန်', 'သံလျင်', 'မှော်ဘီ', 'တိုက်ကြီး', 'ကျောက်တန်း', 'သုံးခွ', 'ခရမ်း', 'ဇရပ်ကွင်း', 
  'ဥက္ကံ', 'ဖောင်ကြီး', 'မြောင်းတကာ', 'ထန်းတပင်', 'ကော့မှူး', 'ကွန်းခြံကုန်း', 'တွံတေး', 
  'ဒါးပိန်', 'လှည်းကူး', 'ကိုကိုးကျွန်း',

  // Naypyidaw Union Territory
  'နေပြည်တော်', 'လယ်၀ေး', 'ပျဥ်းမနား', 'တပ်ကုန်း'
];

export default function Checkout(props: { disableCustomTheme?: boolean }) {
  const checkoutData = useSelector((state: RootState) => state.checkout);
  const {totalQuantity, totalAmount, items} = useSelector((state: any) => state.cart);
  const [isMobile, setIsMobile] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    city: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTotalAmount(totalAmount));  
    dispatch(setTotalQuantity(totalQuantity));  
    dispatch(setItems(items));
    
    // Detect if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4))) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    
    checkMobile();
    console.log(checkoutData);
  }, [items, totalAmount, totalQuantity, dispatch, checkoutData]); 

  // Validation function
  const validateForm = () => {
    const errors = {
      name: '',
      phone: '',
      city: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    setFormErrors(errors);
    const isValid = !errors.name && !errors.phone && !errors.city;
    setIsFormValid(isValid);
    return isValid;
  };

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (validateForm()) {
      // Generate order data
      if (items && items.length > 0) {
        const simplifiedItems = items.map((item: { id: any; size: any; quantity: any; }) => ({
          id: item.id,
          s: item.size,
          q: item.quantity
        }));
        
        const newOrderData = {
          items: simplifiedItems,
          tq: totalQuantity,
          ta: totalAmount,
          n: formData.name.trim(),
          p: formData.phone.trim(),
          c: formData.city.trim(),
          timestamp: Date.now()
        };
        
        console.log('Order Data Object:', newOrderData);
        
        setOrderData(newOrderData);
        setShowOrderData(true);
      }
    }
  };

  // Validate form on input changes
  useEffect(() => {
    if (formData.name || formData.phone || formData.city) {
      validateForm();
    }
  }, [formData]);

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(orderData, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('Order data copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  const renderCustomerForm = () => (
    <Box sx={{ 
      mx: 'auto', 
      p: 3, 
      bgcolor: 'background.paper', 
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: 'left' }}>
        အော်ဒါမှာယူသူ အချက်အလက်
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Name Field */}
        <TextField
          label="အမည် *"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={!!formErrors.name}
          helperText={formErrors.name}
          placeholder="အမည်ရိုက်ထည့်ပါ"
        />

        {/* Phone Field */}
        <TextField
          label="ဖုန်းနံပါတ် *"
          variant="outlined"
          fullWidth
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={!!formErrors.phone}
          helperText={formErrors.phone}
          placeholder="ဖုန်းနံပါတ်ရိုက်ထည့်ပါ e.g., +95 xxxxxxxxx"
        />

        {/* City Field */}
        <Autocomplete
          options={myanmarCities}
          value={formData.city}
          onChange={(event, newValue) => {
            handleInputChange('city', newValue || '');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="နေထိုင်ရာမြို့အမည် *"
              variant="outlined"
              error={!!formErrors.city}
              helperText={formErrors.city}
              placeholder="သင်နေထိုင်ရာ မြို့ အမည်ကိုရွေးပါ"
            />
          )}
          freeSolo
          autoHighlight
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleFormSubmit}
          disabled={!isFormValid}
          sx={{ mt: 2, py: 1.5 }}
        >
          အော်ဒါ တင်မည်
        </Button>
      </Box>
    </Box>
  );

  const renderOrderDataSection = () => (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'background.paper', 
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        အော်ဒါ အချက်အလက်
      </Typography>
      
      <Box sx={{ 
        bgcolor: '#f5f5f5', 
        p: 2, 
        borderRadius: 1, 
        mb: 3,
        fontFamily: 'monospace',
        fontSize: '14px',
        overflowX: 'auto'
      }}>
        <pre>{JSON.stringify(orderData, null, 2)}</pre>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={copyToClipboard}
        >
          Copy JSON Data
        </Button>
        
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setShowOrderData(false)}
        >
          အချက်အလက်ပြင်ဆင်မည်
        </Button>
      </Box>

      <Typography sx={{fontSize: 15, textAlign: 'center', mt: 3}} gutterBottom>
        အောက်ပါ Social Platform များတွင် ငွေချေ ပြီး အော်ဒါတင်ယူပါ။
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          pt: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Messenger Icon Button */}
        <IconButton
          aria-label="messenger"
          sx={{
            backgroundColor: '#0084FF',
            color: 'white',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#0070D8',
              transform: 'scale(1.1)'
            },
            width: 48,
            height: 48
          }}
          onClick={() => window.open('https://m.me/stickerstoreyangon', '_blank')}
        >
          <FacebookIcon />
        </IconButton>

        {/* Telegram Icon Button */}
        <IconButton
          aria-label="telegram"
          sx={{
            mx: 1,
            backgroundColor: '#0088cc',
            color: 'white',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#0077b3',
              transform: 'scale(1.1)'
            },
            width: 48,
            height: 48
          }}
          onClick={() => window.open('https://t.me/your-username', '_blank')}
        >
          <TelegramIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Grid
      container
      sx={{
        height: {
          xs: '100%',
        },
        mt: {
          xs: 4,
          sm: 0,
        },
      }}
    >
      <Grid
        size={{ xs: 12, sm: 5, lg: 4 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRight: { sm: 'none', md: '1px solid' },
          borderColor: { sm: 'none', md: 'divider' },
          alignItems: 'start',
          pt: 16,
          px: 10,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: 500,
            minHeight: '80vh',
          }}
        >
          <Info totalPrice={totalAmount + ' ကျပ်'} totalQuantity={totalQuantity} />
        </Box>
      </Grid>
      <Grid
        size={{ sm: 12, md: 7, lg: 8 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 0, sm: 7.1 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
          {!showOrderData ? (
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                width: '100%',
                flexDirection: 'column'
              }}
            >
              {renderCustomerForm()}
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'column'
              }}
            >
              <Box sx={{px: 10, pb: 10, pt: 4, width: '100%'}}>
                {renderOrderDataSection()}
              </Box>
            </Box>
          )}
        
        <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
          <CardContent
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography variant="subtitle2" gutterBottom>
                ရွေးချယ်ထားသော ပစ္စည်း များ
              </Typography>
              <Typography variant="body1">
                {totalAmount} ကျပ်
              </Typography>
            </div>
            <InfoMobile totalPrice={totalAmount + ' ကျပ်'} totalQuantity={totalQuantity} />
          </CardContent>
        </Card>
        
        {/* Mobile Customer Form and Order Data */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }}>
          {!showOrderData ? (
            renderCustomerForm()
          ) : (
            <Box sx={{pt: 3}}>
              {renderOrderDataSection()}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}