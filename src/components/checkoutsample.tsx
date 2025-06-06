// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid2';
// import Stack from '@mui/material/Stack';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Stepper from '@mui/material/Stepper';
// import Typography from '@mui/material/Typography';
// import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import InfoMobile from '@/components/InfoMobile';
// import AddressForm from '@/components/AddressForm';
// import PaymentForm from '@/components/PaymentForm';
// import Review from '@/components/Review';
// import Info from '@/components/Info';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { clearCheckoutData, setItems, setTotalAmount, setTotalQuantity } from '../src/redux/slices/checkoutSlice';
// import { Badge, IconButton } from '@mui/material';
// import { useRouter } from 'next/router';

// const steps = ['Shipping address', 'Payment details', 'Review your order'];
// export default function Checkout(props: { disableCustomTheme?: boolean }) {

//   const checkoutData = useSelector((state: RootState) => state.checkout);
//   const {totalQuantity, totalAmount, items} = useSelector((state: any) => state.cart);

//   function getStepContent(step: number) {
//     switch (step) {
//       case 0:
//         return <AddressForm />;
//       case 1:
//         return <PaymentForm onFileSelect={handleFileSelect} />;
//       case 2:
//         return <Review checkoutData={checkoutData} />;
//       default:
//         throw new Error('Unknown step');
//     }
//   }

//   const router = useRouter();
  
//   const handleNavigate = (targetUrl: string) => {
//       router.push(targetUrl);
//   };

//   const dispatch = useDispatch();

//   const [activeStep, setActiveStep] = React.useState(0);
//   const [file, setFile] = React.useState<File | null>(null); // Store the selected file here
  
//   const handleFileSelect = (selectedFile: File | null) => {
//     setFile(selectedFile); // Update the file in the state
//   };

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);

//     console.log(file);

//     const formData = {
//       name: checkoutData.name,
//       phone_no: checkoutData.phone_no,
//       address: checkoutData.address,
//       state_id: checkoutData.state_id,
//       city_id: checkoutData.city_id,
//       total_amount: checkoutData.total_amount,
//       total_quantity: checkoutData.total_quantity,
//       items: checkoutData.items,
//     };

//     // Now you can either pass the formData to the next step, or submit it
//     console.log(checkoutData);
//   };
//   const handleBack = () => {
//     setActiveStep(activeStep - 1);

//     console.log(checkoutData);
//   };

//   const resetForm = () => {
//       dispatch(clearCheckoutData());
//       handleNavigate('/mini-mart')
// }

//    React.useEffect(() => {
//         dispatch(setTotalAmount(totalAmount));  
//         dispatch(setTotalQuantity(totalQuantity));  
//         dispatch(setItems(items))
    
//         console.log(checkoutData)
//     }); 

//   return (
//       <Grid
//         container
//         sx={{
//           height: {
//             xs: '100%',
//             sm: 'calc(100dvh - var(--template-frame-height, 0px))',
//           },
//           mt: {
//             xs: 4,
//             sm: 0,
//           },
//         }}
//       >
//         <Grid
//           size={{ xs: 12, sm: 5, lg: 4 }}
//           sx={{
//             display: { xs: 'none', md: 'flex' },
//             flexDirection: 'column',
//             backgroundColor: 'background.paper',
//             borderRight: { sm: 'none', md: '1px solid' },
//             borderColor: { sm: 'none', md: 'divider' },
//             alignItems: 'start',
//             pt: 16,
//             px: 10,
//             gap: 4,
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               flexGrow: 1,
//               width: '100%',
//               maxWidth: 500,
//             }}
//           >
//             <Info totalPrice={totalAmount + ' MMK'} totalQuantity={totalQuantity} />
//           </Box>
//         </Grid>
//         <Grid
//           size={{ sm: 12, md: 7, lg: 8 }}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             maxWidth: '100%',
//             width: '100%',
//             backgroundColor: { xs: 'transparent', sm: 'background.default' },
//             alignItems: 'start',
//             pt: { xs: 0, sm: 16 },
//             px: { xs: 2, sm: 10 },
//             gap: { xs: 4, md: 8 },
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: { sm: 'space-between', md: 'flex-end' },
//               alignItems: 'center',
//               width: '100%',
//               maxWidth: { sm: '100%', md: 600 },
//             }}
//           >
//             <Box
//               sx={{
//                 display: { xs: 'none', md: 'flex' },
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'flex-end',
//                 flexGrow: 1,
//               }}
//             >
//               <Stepper
//                 id="desktop-stepper"
//                 activeStep={activeStep}
//                 sx={{ width: '100%', height: 40 }}
//               >
//                 {steps.map((label) => (
//                   <Step
//                     sx={{
//                       ':first-of-type': { pl: 0 },
//                       ':last-child': { pr: 0 },
//                       '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
//                     }}
//                     key={label}
//                   >
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </Box>
//           <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
//             <CardContent
//               sx={{
//                 display: 'flex',
//                 width: '100%',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <div>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Selected products
//                 </Typography>
//                 <Typography variant="body1">
//                   {totalAmount} MMK
//                 </Typography>
//               </div>
//               <InfoMobile totalPrice={totalAmount + ' MMK'} totalQuantity={totalQuantity} />
//             </CardContent>
//           </Card>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               flexGrow: 1,
//               width: '100%',
//               maxWidth: { sm: '100%', md: 600 },
//               maxHeight: '420px',
//               gap: { xs: 5, md: 'none' },
//             }}
//           >
//             <Stepper
//               id="mobile-stepper"
//               activeStep={activeStep}
//               alternativeLabel
//               sx={{ display: { sm: 'flex', md: 'none' } }}
//             >
//               {steps.map((label) => (
//                 <Step
//                   sx={{
//                     ':first-of-type': { pl: 0 },
//                     ':last-child': { pr: 0 },
//                     '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
//                   }}
//                   key={label}
//                 >
//                   <StepLabel
//                     sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             {activeStep === steps.length ? (
//               <Stack spacing={2} useFlexGap>
//                 <Typography variant="h1">📦</Typography>
//                 <Typography variant="h5">Thank you for your order!</Typography>
//                 <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//                   Your order number is
//                   <strong>&nbsp;#140396</strong>. We have emailed your order
//                   confirmation and will update you once its shipped.
//                 </Typography>
//                 <Button
//                   onClick={() => resetForm()}
//                   variant="contained"
//                   sx={{ alignSelf: 'start',mb: 5, width: { xs: '100%', sm: 'auto' } }}
//                 >
//                   Order Again
//                 </Button>
//               </Stack>
//             ) : (
//               <React.Fragment>
//                 {getStepContent(activeStep)}
//                 <Box
//                   sx={[
//                     {
//                       display: 'flex',
//                       flexDirection: { xs: 'column-reverse', sm: 'row' },
//                       alignItems: 'end',
//                       flexGrow: 1,
//                       gap: 1,
//                       mx: 2,
//                       pb: { xs: 12, sm: 0 },
//                       mt: { xs: 2, sm: 0 },
//                       mb: '60px',
//                     },
//                     activeStep !== 0
//                       ? { justifyContent: 'space-between' }
//                       : { justifyContent: 'flex-end' },
//                   ]}
//                 >
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="text"
//                       sx={{ display: { xs: 'none', sm: 'flex' } }}
//                     >
//                       Previous
//                     </Button>
//                   )}
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="outlined"
//                       fullWidth
//                       sx={{ display: { xs: 'flex', sm: 'none' } }}
//                     >
//                       Previous
//                     </Button>
//                   )}
//                   <Button
//                     variant="contained"
//                     endIcon={<ChevronRightRoundedIcon />}
//                     onClick={handleNext}
//                     sx={{ width: { xs: '100%', sm: 'fit-content' } }}
//                   >
//                     {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
//                   </Button>
//                 </Box>
//               </React.Fragment>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
//   );
// }
