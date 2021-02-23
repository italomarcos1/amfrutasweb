import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import * as Yup from 'yup';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  Title,
  ConfirmationText,
  ShippingWarning,
  DeliveryButton,
  DeliveryButtonContainer,
  DeliveryButtonContent,
  DeliveryOptionsContainer,
  DeliveryDateContainer,
  InfoContainer,
  SectionTitle,
  CouponInput,
  SendButton,
  CouponIsValid,
  LoadingCoupon,
  TakeOnShop,
  StartStop,
  LoadingContainer,
  UseAddress,
} from './styles';

import { onlyValues } from '~/utils/onlyValues';
import { calculateCashback, formatPrice } from '~/utils/calculatePrice';

import backend from '~/services/api';

import { InputContainer, Button, SecureLogin } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';
import checked from '~/assets/checked.svg';

import truckBlack from '~/assets/orders/truck-black.svg';
import truckWhite from '~/assets/orders/truck-white.svg';

import lojaBlack from '~/assets/orders/loja-black.svg';
import lojaWhite from '~/assets/orders/loja-white.svg';

import Footer from '~/components/Footer';
import TextArea from '~/components/TextArea';

import NoTitleSelect from '~/components/NoTitleSelect';
import Input from '~/components/FormInput';
import InputMask from '~/components/FormInputMask';
import Select from '~/components/Select';
import ItemsList from '~/components/ItemsList';

import CheckoutHeader from '~/components/CheckoutHeader';
import CheckoutHeaderMobile from '~/components/CheckoutHeaderMobile';
import Item from '~/components/CheckoutItem';
import Toast from '~/components/Toast';

import {
  addFinalProfileRequest,
  updateProfileRequest,
} from '~/store/modules/user/actions';
import {
  addFinalAddressRequest,
  updateFinalShippingInfoRequest,
} from '~/store/modules/addresses/actions';

import { finishOrderRequest } from '~/store/modules/cart/actions';

import { nameIsValid, postcodeIsValid } from '~/utils/validation';

import fakeAddress from '~/utils/fakeAddress';
import getValidationErrors from '~/utils/validationErrors';

export default function Delivery() {
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [deliveryDay, setDeliveryDay] = useState('');
  const [deliveryHour, setDeliveryHour] = useState('');
  const [country, setCountry] = useState('Portugal');
  const [coupon, setCoupon] = useState('');
  const [couponIsValid, setCouponIsValid] = useState(false);
  const [hoverCouponValid, setHoverCouponValid] = useState(false);
  const [hoverButton, setHoverButton] = useState('none');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const accountButtonRef = useRef();
  const shippingButtonRef = useRef();
  const profileInfoRef = useRef();
  const shippingInfoRef = useRef();

  const cart = useSelector(state => state.cart.products);
  const hasOrder = useSelector(state => state.cart.hasOrder);
  const price = useSelector(state => state.cart.price);
  const saved = useSelector(state => state.cart.saved);
  const processingOrder = useSelector(state => state.cart.processingOrder);
  const orderFinished = useSelector(state => state.cart.orderFinished);

  const [newAddress, setNewAddress] = useState(false);

  const profile = useSelector(state => state.user.profile);
  const finalProfile = useSelector(state => state.user.finalProfile);
  const finalAddress = useSelector(state => state.addresses.finalAddress);
  const addresses = useSelector(state => state.addresses.addresses);

  const primaryAddress = useMemo(() => {
    return !!profile.default_address
      ? profile.default_address.length !== 0
        ? { ...profile.default_address }
        : null
      : null;
  }, [profile]);

  // const primaryAddress = useMemo(() => {
  //   return !!profile.default_address
  //     ? profile.default_address.length !== 0
  //       ? { ...profile.default_address }
  //       : null
  //     : null;
  // }, [profile]);

  const [formattedAddresses, setFormattedAddresses] = useState(null);

  const [newPrimaryAddress, setNewPrimaryAddress] = useState(false);

  const [zipcode, setZipcode] = useState(() => {
    if (!!primaryAddress) {
      const zipcodeAsArray = [...primaryAddress.zipcode];

      const findHyphen = zipcodeAsArray.indexOf('-');

      if (findHyphen > -1) return primaryAddress.zipcode;

      const formattedZipcode = `${zipcodeAsArray[0]}${zipcodeAsArray[1]}${zipcodeAsArray[2]}${zipcodeAsArray[3]}-${zipcodeAsArray[4]}${zipcodeAsArray[5]}${zipcodeAsArray[6]}`;
      return formattedZipcode;
    }
    return '';
  });

  const [residence, setResidence] = useState(
    !!primaryAddress ? primaryAddress.address : ''
  );

  const [hasLookup, setHasLookup] = useState(false);

  const [email, setEmail] = useState(!!profile ? profile.email : '');
  const [emailError, setEmailError] = useState(false);
  const [gender, setGender] = useState(
    !!profile ? profile.gender : 'Masculino'
  );

  const [clientCback, setClientCback] = useState(
    !!profile
      ? !!profile.cback_credit
        ? profile.cback_credit
        : '0.00'
      : '0.00'
  );

  const [fixedShippingCost, setFixedShippingCost] = useState(0);
  const [minValueShipping, setMinValueShipping] = useState(0);
  const [minValueFreeShipping, setMinValueFreeShipping] = useState(0);
  const [minValueWithdrawStore, setMinValueWithdrawStore] = useState(0);

  const [invalidPostcode, setInvalidPostcode] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);

  const [validUserInfo, setValidUserInfo] = useState(false);
  const [validShippingInfo, setValidShippingInfo] = useState(false);

  const [deliveryDays, setDeliveryDays] = useState([]);
  const [deliveryHours, setDeliveryHours] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [chosenShippingMethod, setChosenShippingMethod] = useState({
    id: 'delivery',
    cost: 4,
    label: 'Entrega em casa',
  });

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [withdrawMessage, setWithdrawMessage] = useState('');

  const [deliveryInterval, setDeliveryInterval] = useState(-1);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCashback, setTotalCashback] = useState(0);

  const [invalidDeliveryDay, setInvalidDeliveryDay] = useState(false);
  const [invalidDeliveryHour, setInvalidDeliveryHour] = useState(false);

  const [totalPrice, setTotalPrice] = useState('0.00');
  const [couponDiscount, setCouponDiscount] = useState(null);

  // os endereços são o objeto inteiro, com id e etc
  // o residence é só o label, pois o select mexe apenas com o label. se não, teríamos que mudar o Select ou criar um novo

  const [currentContainerHeight, setCurrentContainerHeight] = useState(
    cart.length * 102 - 20
  );

  const [toastVisible, setToastVisible] = useState(false);
  const [finishingOrder, setFinishingOrder] = useState(false);

  useEffect(() => {
    if (!processingOrder) setFinishingOrder(false);
    else setFinishingOrder(true);
  }, [processingOrder]);

  useEffect(() => {
    if (invalidCoupon) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 2800);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [invalidCoupon]);

  const validateCoupon = useCallback(async () => {
    try {
      setLoadingCoupon(true);
      const {
        data: {
          data: { discount },
        },
      } = await backend.get(`vouchers/${coupon}`);

      setCouponIsValid(true);
      setCouponDiscount(discount);

      setLoadingCoupon(false);
    } catch {
      setLoadingCoupon(false);
      setCouponIsValid(false);
      setInvalidCoupon(true);
    }
  }, [coupon]);

  const loadShippingCost = useCallback(async () => {
    const {
      data: { data },
    } = await backend.get(`checkout/shipping-cost?subtotal=${price}`);

    setShippingCost(data);
  }, [price]);

  useEffect(() => loadShippingCost(), [loadShippingCost, price]);

  const loadData = useCallback(async () => {
    const keys = [
      'min_value_shipping',
      'shipping_cost',
      'min_value_free_shipping',
      'min_value_withdrawinstore',
      'withdrawinstore_message',
    ];

    const [
      delivery,
      shipping,
      configurationsResponse,
      availableCbackResponse,
    ] = await Promise.all([
      backend.get('checkout/delivery-intervals'),
      backend.get('checkout/shipping-methods'),
      backend.get('/configurations', { keys }),
      backend.get('/clients/cbacks'),
    ]);

    const {
      data: { data: deliveryData },
    } = delivery;

    const {
      data: { data: shippingData },
    } = shipping;

    const {
      data: {
        data: {
          min_value_shipping,
          shipping_cost,
          min_value_free_shipping,
          min_value_withdrawinstore,
          withdrawinstore_message,
        },
      },
    } = configurationsResponse;

    const {
      data: { data: availableCback },
    } = availableCbackResponse;

    const formattingDeliveryDays = deliveryData.map(d => ({
      ...d,
      value: d.label,
    }));

    setDeliveryDays(formattingDeliveryDays);
    setShippingMethods(shippingData);

    setFixedShippingCost(shipping_cost);
    setMinValueShipping(min_value_shipping);
    setMinValueFreeShipping(min_value_free_shipping);
    setMinValueWithdrawStore(min_value_withdrawinstore);
    setWithdrawMessage(withdrawinstore_message);

    if (clientCback !== availableCback) {
      dispatch(
        updateProfileRequest({ ...profile, cback_credit: availableCback })
      );
    }
    setClientCback(availableCback);
  }, [dispatch, clientCback, profile]);

  useEffect(() => {
    const findIndex = deliveryDays.findIndex(d => d.label === deliveryDay);
    if (findIndex > -1) setDeliveryHours(deliveryDays[findIndex].intervals);
  }, [deliveryDays, deliveryDay]);

  const formatAddresses = useCallback(() => {
    if (addresses.length === 0) return;

    const formattingAddresses = addresses.map(({ id, address }) => ({
      id,
      value: address,
      label: address,
    }));

    setFormattedAddresses(formattingAddresses);
  }, [addresses]);

  useEffect(() => {
    window.scrollTo(0, 0);
    formatAddresses();
    loadData();
  }, []);

  const populateAddress = useCallback(() => {
    if (newAddress) return;
    const findNewAddress = addresses.findIndex(
      address => address.address === residence
    );

    if (findNewAddress < 0) return;
    // aqui1

    const selectedAddress = addresses[findNewAddress];

    shippingInfoRef.current.setData({
      ...selectedAddress,
      destination_name: `${selectedAddress.destination_name} ${selectedAddress.destination_last_name}`,
    });

    const zipcodeAsArray = [...selectedAddress.zipcode];

    const findHyphen = zipcodeAsArray.indexOf('-');

    if (findHyphen > -1) setZipcode(String(selectedAddress.zipcode));
    else {
      const formattedZipcode = `${zipcodeAsArray[0]}${zipcodeAsArray[1]}${zipcodeAsArray[2]}${zipcodeAsArray[3]}-${zipcodeAsArray[4]}${zipcodeAsArray[5]}${zipcodeAsArray[6]}`;
      setZipcode(formattedZipcode);
    }
  }, [addresses, residence, newAddress]);

  const populateDeliveryInterval = useCallback(() => {
    const findIndex = deliveryHours.findIndex(d => d.label === deliveryHour);
    if (findIndex < 0) {
      return;
    }

    setDeliveryInterval(deliveryHours[findIndex].id);
  }, [deliveryHour, deliveryHours]);

  useEffect(() => {
    if (deliveryHour === -1) return;
    populateDeliveryInterval();
  }, [deliveryHour, populateDeliveryInterval]);

  useEffect(() => {
    if (addresses.length === 0) return;
    populateAddress();
  }, [residence, addresses, populateAddress]);

  const handleFinishOrder = useCallback(() => {
    if (!finalProfile || (deliveryOption === 'delivery' && !finalAddress)) {
      return;
    }

    const formattedDeliveryDay = deliveryDay.split('/').join('-');

    let formattedFinalAddress;

    if (deliveryOption === 'delivery') {
      formattedFinalAddress = {
        destination_name: finalAddress.destination_name,
        destination_last_name: finalAddress.destination_last_name,
        ...finalAddress,
      };
    }

    let checkout = {
      shipping_address:
        deliveryOption === 'delivery' ? formattedFinalAddress : fakeAddress,
      shippingMethod: deliveryOption,
      deliveryDate: formattedDeliveryDay,
      deliveryInterval,
      products: cart,
    };

    if (couponIsValid) checkout = { ...checkout, voucher: coupon };
    setValidUserInfo(false);

    dispatch(finishOrderRequest(checkout));
  }, [
    dispatch,
    cart,
    coupon,
    couponIsValid,
    deliveryOption,
    finalAddress,
    finalProfile,
    deliveryDay,
    deliveryInterval,
  ]);

  const lookupAddress = useCallback(async () => {
    if (!postcodeIsValid(zipcode)) {
      setInvalidPostcode(true);
      return;
    }
    setInvalidPostcode(false);
    setNewAddress(true);

    setLoading(true);

    const [cod, ext] = zipcode.split('-');

    try {
      const {
        data: { data },
      } = await backend.get(`/postcodes/${cod}-${ext}`);
      setLoading(false);

      shippingInfoRef.current.setData({
        ...data,
        zipcode: `${data.num_cod_postal}-${data.ext_cod_postal}`,
      });
    } catch (err) {
      setLoading(false);
      alert('Informe um código postal válido.');
    }
  }, [zipcode]);

  useEffect(() => {
    if (deliveryOption === 'withdrawinstore' && validUserInfo) {
      handleFinishOrder();
      return;
    }
    if (validUserInfo && validShippingInfo) handleFinishOrder();
  }, [
    validUserInfo,
    validShippingInfo,
    handleFinishOrder,
    finalAddress,
    finalProfile,
    deliveryOption,
  ]);

  useEffect(() => {
    if (addresses.length === 0 || hasLookup) setNewAddress(true);
    else setNewAddress(false);
  }, [addresses, hasLookup]);

  useEffect(() => {
    if (hasLookup === false) return;
    if (newAddress === false) {
      setHasLookup(false);
      shippingInfoRef.current.setData({});
    }
  }, [newAddress, hasLookup]);

  const handleSubmit = useCallback(
    async formData => {
      try {
        console.log(formData);

        setValidUserInfo(false);
        setInvalidDeliveryDay(false);
        setInvalidDeliveryHour(false);

        profileInfoRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          last_name: Yup.string().required('O apelido é obrigatório'),
          email: Yup.string().required().email('Informe um e-mail válido'),
          birth: Yup.string()
            .min(10)
            .matches(/^[0-3][0-9]\/[0-1][0-9]\/[1-2][0|9][0-9][0-9]$/)
            .required(),
          document: Yup.string()
            .min(9)
            .matches(/^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)
            .required(),
          cellphone: Yup.string()
            .min(12)
            .matches(
              /^[0-9][0-9][\s][0-9][0-9][0-9][\s][0-9][0-9][\s][0-9][0-9]$/
            )
            .required(),
        });

        const formDataWithEmail = { ...formData, email };

        await schema.validate(formDataWithEmail, { abortEarly: false });

        if (
          deliveryOption === 'delivery' &&
          (nameIsValid(deliveryDay) || nameIsValid(deliveryHour))
        ) {
          setInvalidDeliveryDay(nameIsValid(deliveryDay));
          setInvalidDeliveryHour(nameIsValid(deliveryHour));

          throw new Error('Invalid delivery time.');
        }

        const allDataShipping = shippingInfoRef.current.getData();

        const { destination_name } = allDataShipping;

        const [newName, ...restOfName] = destination_name.split(' ');

        const newNickname = restOfName.join(' ');

        const shippingData = {
          ...formData,
          destination_name: newName,
          destination_last_name: newNickname,
          country,
          zipcode,
          default: 1,
        };

        const profileData = {
          ...formData,
          gender,
          default_address:
            newPrimaryAddress && deliveryOption === 'delivery'
              ? shippingData
              : primaryAddress,
        };

        dispatch(addFinalProfileRequest(profileData));

        setValidUserInfo(true);
        setFinishingOrder(false);
      } catch (err) {
        const formDataWithEmail = { ...formData, email };

        const errors = getValidationErrors(formDataWithEmail, err);

        profileInfoRef.current.setErrors(errors);
        window.scrollTo(0, 0);
        setFinishingOrder(false);

        console.log(err);
      }
    },
    [
      email,
      dispatch,
      gender,
      deliveryDay,
      deliveryHour,
      deliveryOption,
      newPrimaryAddress,
      primaryAddress,
      country,
      zipcode,
    ]
  );

  const handleShippingInfo = useCallback(
    async formData => {
      // validar pra caso seja o input ou select
      try {
        setInvalidPostcode(false);
        setInvalidLocation(false);
        setValidShippingInfo(false);

        shippingInfoRef.current.setErrors({});

        const schema = Yup.object().shape({
          destination_name: Yup.string().required(),
          zipcode: Yup.string()
            .required()
            .matches(/^[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]$/),
          address: Yup.string().required(),
          number: Yup.string().required(),
          district: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          residence: Yup.string().required(),
        });

        const formDataWithResidence = newAddress
          ? formData
          : { ...formData, residence };

        await schema.validate(formDataWithResidence, { abortEarly: false });

        console.log(formData);

        if (
          deliveryOption === 'delivery' &&
          (nameIsValid(deliveryDay) || nameIsValid(deliveryHour))
        ) {
          setInvalidDeliveryDay(nameIsValid(deliveryDay));
          setInvalidDeliveryHour(nameIsValid(deliveryHour));

          throw new Error('Invalid delivery time');
        }

        const allDataShipping = shippingInfoRef.current.getData();
        const profileInfo = profileInfoRef.current.getData();

        const { destination_name } = allDataShipping;

        const [newName, ...restOfName] = destination_name.split(' ');

        const newNickname = restOfName.join(' ');

        const shippingData = {
          ...formData,
          destination_name: newName,
          destination_last_name: newNickname,
          country,
          zipcode,
        };

        if (newAddress) {
          dispatch(
            addFinalAddressRequest({
              address: { ...shippingData, default: newPrimaryAddress ? 1 : 0 },
              profile: {
                ...profileInfo,
                gender,
              },
            })
          );
        } else {
          dispatch(
            updateFinalShippingInfoRequest({
              address: { ...shippingData, default: newPrimaryAddress ? 1 : 0 },
              profile: {
                ...profileInfo,
                gender,
              },
            })
          );
        }

        // tratar o caso onde o residence está com o select

        setValidShippingInfo(true);
        setFinishingOrder(false);
      } catch (err) {
        const formDataWithResidence = newAddress
          ? formData
          : { ...formData, residence };

        const errors = getValidationErrors(formDataWithResidence, err);

        shippingInfoRef.current.setErrors(errors);
        window.scrollTo(0, 0);
        setFinishingOrder(false);

        console.log(err);
      }
    },
    [
      dispatch,
      country,
      zipcode,
      newAddress,
      gender,
      newPrimaryAddress,
      deliveryDay,
      deliveryHour,
      deliveryOption,
      residence,
    ]
  );

  const handleCashback = useCallback(() => {
    const { formattedPrice } = calculateCashback(cart);

    setTotalCashback(formattedPrice);
  }, [cart]);

  useEffect(() => {
    handleCashback();
  }, [cart, handleCashback]);

  useEffect(() => {
    if (orderFinished) {
      history.push('/confirmacao');
      setFinishingOrder(false);
    }
  }, [orderFinished, history]);

  useEffect(() => {
    const formattingPrice = formatPrice(
      Number(shippingCost) - Number(clientCback)
    );

    if (couponDiscount && couponIsValid) {
      setTotalPrice(
        formatPrice(
          Number(price - (couponDiscount / 100) * price) +
            Number(formattingPrice)
        )
      );
    } else setTotalPrice(formatPrice(Number(price) + Number(formattingPrice)));
  }, [
    price,
    shippingCost,
    profile,
    couponDiscount,
    couponIsValid,
    clientCback,
  ]);

  const genderData = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

  if (cart.length === 0 || !hasOrder) {
    return <Redirect to="/cesto" />;
  }

  return (
    <>
      {isDesktop ? (
        <CheckoutHeader active={2} />
      ) : (
        <CheckoutHeaderMobile active={2} />
      )}
      <Container>
        <Content isDesktop={isDesktop}>
          <DeliveryOptionsContainer isDesktop={isDesktop}>
            <div
              style={
                isDesktop
                  ? { width: 416, display: 'flex' }
                  : { display: 'flex', width: '100%' }
              }
            >
              <DeliveryButton
                isDesktop={isDesktop}
                selected={
                  deliveryOption === 'delivery' || hoverButton === 'delivery'
                }
                onClick={() => {
                  setDeliveryOption('delivery');
                  if (shippingMethods.length !== 0)
                    setChosenShippingMethod(shippingMethods[0]);
                }}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                onMouseOver={() => {
                  if (deliveryOption !== 'delivery') setHoverButton('delivery');
                }}
                onMouseLeave={() => {
                  if (deliveryOption !== 'delivery') setHoverButton('none');
                }}
              >
                <DeliveryButtonContainer isDesktop={isDesktop}>
                  <DeliveryButtonContent
                    selected={
                      deliveryOption === 'delivery' ||
                      hoverButton === 'delivery'
                    }
                    isDesktop={isDesktop}
                  >
                    <img
                      src={
                        deliveryOption === 'delivery' ||
                        hoverButton === 'delivery'
                          ? truckWhite
                          : truckBlack
                      }
                      alt="Entrega"
                      style={{ width: 36, height: 30 }}
                    />
                    Entrega Própria
                  </DeliveryButtonContent>
                  <div>Grátis</div>
                </DeliveryButtonContainer>
              </DeliveryButton>
              <DeliveryButton
                isDesktop={isDesktop}
                selected={
                  deliveryOption === 'withdrawinstore' ||
                  hoverButton === 'withdrawinstore'
                }
                onClick={() => {
                  setDeliveryOption('withdrawinstore');
                  if (shippingMethods.length !== 0)
                    setChosenShippingMethod(shippingMethods[1]);
                }}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onMouseOver={() => {
                  if (deliveryOption !== 'withdrawinstore')
                    setHoverButton('withdrawinstore');
                }}
                onMouseLeave={() => {
                  if (deliveryOption !== 'withdrawinstore')
                    setHoverButton('none');
                }}
              >
                <DeliveryButtonContainer isDesktop={isDesktop}>
                  <DeliveryButtonContent
                    selected={
                      deliveryOption === 'withdrawinstore' ||
                      hoverButton === 'withdrawinstore'
                    }
                    style={isDesktop ? {} : { fontSize: 12, width: '90%' }}
                    isDesktop={isDesktop}
                  >
                    <img
                      src={
                        deliveryOption === 'withdrawinstore' ||
                        hoverButton === 'withdrawinstore'
                          ? lojaWhite
                          : lojaBlack
                      }
                      alt="Retirar na loja"
                      style={{ width: 28, height: 25 }}
                    />
                    Retirar
                    {isDesktop && <br />} na {!isDesktop && <br />} Loja
                  </DeliveryButtonContent>
                  <div>Grátis</div>
                </DeliveryButtonContainer>
              </DeliveryButton>
            </div>
            {deliveryOption === 'withdrawinstore' ? (
              <TakeOnShop isDesktop={isDesktop}>{withdrawMessage}</TakeOnShop>
            ) : (
              <DeliveryDateContainer
                error={invalidDeliveryDay || invalidDeliveryHour}
                isDesktop={isDesktop}
              >
                <div
                  style={
                    isDesktop
                      ? { width: '80%', height: 53 }
                      : { width: '100%', height: 145, padding: 10 }
                  }
                >
                  <strong
                    style={
                      isDesktop
                        ? { width: '100%' }
                        : {
                            display: 'inline-block',
                            width: '100%',
                            height: 32,
                          }
                    }
                  >
                    Selecione o melhor dia e horário para entrega
                  </strong>
                  <div
                    style={
                      isDesktop
                        ? {}
                        : {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            height: 70,
                            marginTop: 10,
                          }
                    }
                  >
                    <NoTitleSelect
                      setValue={setDeliveryDay}
                      customWidth={isDesktop ? 125 : 229}
                      placeholder="Dia"
                      data={deliveryDays}
                    />
                    <NoTitleSelect
                      setValue={setDeliveryHour}
                      customWidth={isDesktop ? 125 : 229}
                      placeholder="Hora"
                      data={deliveryHours}
                    />
                  </div>
                </div>
              </DeliveryDateContainer>
            )}
            <ShippingWarning isDesktop={isDesktop}>
              Levantamento na loja:
              <b>Grátis</b>
              <br /> Compras até € {minValueShipping}:
              <b>Entrega € {fixedShippingCost}</b>
              <br /> Compras acima de € {minValueFreeShipping}:
              <b>Entrega Grátis</b>
            </ShippingWarning>
          </DeliveryOptionsContainer>
        </Content>

        <Content isDesktop={isDesktop} style={{ marginTop: 40 }}>
          <InfoContainer
            onSubmit={handleSubmit}
            initialData={profile}
            ref={profileInfoRef}
            isDesktop={isDesktop}
          >
            <SectionTitle>
              <strong>Dados de contato</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer isDesktop={isDesktop}>
              <Input
                name="name"
                title="Nome"
                placeholder="Escreve o teu nome"
                customWidth={isDesktop ? 221 : '100%'}
              />
              <Input
                name="last_name"
                title="Apelido"
                placeholder="Escolhe o teu apelido"
                customWidth={isDesktop ? 221 : '100%'}
              />
            </InputContainer>
            <InputContainer isDesktop={isDesktop}>
              <Input
                name="email"
                title="Email"
                placeholder="Escreve o teu e-mail"
                value={email}
                onChange={({ target: { value } }) =>
                  onlyValues(value, setEmail)
                }
                customWidth={isDesktop ? 221 : '100%'}
              />

              <InputMask
                name="birth"
                title="Data de nascimento"
                customWidth={isDesktop ? 221 : '100%'}
              />
            </InputContainer>
            <InputContainer isDesktop={isDesktop}>
              <InputMask
                name="document"
                type="9d"
                title="NIF"
                customWidth={isDesktop ? 221 : '100%'}
              />

              {gender !== '' ? (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  defaultValue={{ label: gender, value: gender }}
                  customWidth={isDesktop ? 221 : '100%'}
                  data={genderData}
                  clearValue
                />
              ) : (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  customWidth={isDesktop ? 221 : '100%'}
                  data={genderData}
                />
              )}
              <button
                type="submit"
                ref={accountButtonRef}
                style={{ display: 'none' }}
              >
                accountButton
              </button>
            </InputContainer>
            <InputContainer isDesktop={isDesktop}>
              <InputMask
                name="cellphone"
                type="phone"
                title="Telemóvel"
                customWidth={isDesktop ? 221 : '100%'}
              />
            </InputContainer>
          </InfoContainer>

          <div style={isDesktop ? {} : { width: '100%' }}>
            {loading && (
              <LoadingContainer isDesktop={isDesktop}>
                <FaSpinner color="#666" size={42} />
              </LoadingContainer>
            )}
            {deliveryOption === 'withdrawinstore' && (
              <LoadingContainer
                isDesktop={isDesktop}
                style={isDesktop ? {} : { width: '100%' }}
              />
            )}
            <InfoContainer
              onSubmit={handleShippingInfo}
              isDesktop={isDesktop}
              style={
                isDesktop
                  ? { width: 683 }
                  : { width: '100%', height: 792, marginTop: 30 }
              }
              initialData={
                !!primaryAddress
                  ? primaryAddress.length !== 0
                    ? {
                        ...primaryAddress,
                        destination_name: `${primaryAddress.destination_name} ${primaryAddress.destination_last_name}`,
                      }
                    : {}
                  : {}
              }
              ref={shippingInfoRef}
              loading={loading}
            >
              <SectionTitle>
                <strong>Morada de entrega</strong>
                <small>
                  {newAddress
                    ? 'Registe um novo endereço.'
                    : 'Confira e atualize caso necessário.'}
                </small>
              </SectionTitle>
              <InputContainer
                style={isDesktop ? { width: 628 } : { width: '100%' }}
                isDesktop={isDesktop}
              >
                {newAddress ? (
                  <Input
                    name="residence"
                    title="Nome da morada (para futuras entregas)"
                    placeholder="Escreve o nome da morada"
                    customWidth={isDesktop ? 325 : '100%'}
                    value={residence}
                    onChange={({ target: { value } }) => setResidence(value)}
                    disabled={loading || deliveryOption === 'withdrawinstore'}
                  />
                ) : (
                  <Select
                    title="Selecione a morada"
                    placeholder="Escolha a morada"
                    setValue={setResidence}
                    defaultValue={{
                      value: residence,
                      label: residence,
                    }}
                    customWidth={isDesktop ? 325 : '100%'}
                    data={formattedAddresses}
                    disabled={loading || deliveryOption === 'withdrawinstore'}
                  />
                )}
                <Input
                  name="destination_name"
                  title="Nome completo do destinatário"
                  placeholder="Escreve o nome do destinatário"
                  customWidth={isDesktop ? 283 : '100%'}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                />
              </InputContainer>
              <InputContainer
                style={
                  isDesktop ? { width: 628 } : { width: '100%', height: 232 }
                }
                isDesktop={isDesktop}
              >
                <InputMask
                  name="zipcode"
                  mask="9999-999"
                  placeholder="0000-000"
                  title="Código Postal"
                  customWidth={isDesktop ? 90 : '100%'}
                  value={zipcode}
                  onChange={({ target: { value } }) => setZipcode(value)}
                  onBlur={lookupAddress}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="address"
                  title="Morada"
                  placeholder="Escreve a tua morada"
                  customWidth={isDesktop ? 215 : '100%'}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="number"
                  title="Número"
                  placeholder="Escreve o teu número"
                  customWidth={isDesktop ? 90 : '100%'}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="district"
                  title="Distrito"
                  placeholder="Escreve o teu distrito"
                  customWidth={isDesktop ? 173 : '100%'}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                />
              </InputContainer>
              <InputContainer
                style={
                  isDesktop ? { width: 628 } : { width: '100%', height: 177 }
                }
                isDesktop={isDesktop}
              >
                <Input
                  name="city"
                  title="Cidade"
                  placeholder="Escreve a tua cidade"
                  customWidth={isDesktop ? 194 : '100%'}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="state"
                  title="Localidade"
                  placeholder="Escolha a Localidade"
                  defaultValue="Lisboa"
                  customWidth={isDesktop ? 221 : '100%'}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                  style={isDesktop ? {} : { marginTop: 0 }}
                />
                <Select
                  title="País"
                  placeholder="Escolha o país"
                  setValue={setCountry}
                  defaultValue={{ value: 'Portugal', label: 'Portugal' }}
                  data={[{ value: 'Portugal', label: 'Portugal' }]}
                  customWidth={isDesktop ? 173 : '100%'}
                  error={invalidLocation}
                  disabled={loading || deliveryOption === 'withdrawinstore'}
                  style={isDesktop ? {} : { marginTop: 25 }}
                />
              </InputContainer>
              <div
                style={{
                  marginTop: 40,
                }}
              >
                <button
                  type="submit"
                  ref={shippingButtonRef}
                  style={{ display: 'none' }}
                >
                  shippingButton
                </button>
                {newAddress ? (
                  <div
                    style={
                      isDesktop
                        ? { display: 'flex' }
                        : {
                            display: 'flex',
                            flexDirection: 'column',
                          }
                    }
                  >
                    <StartStop selected={newPrimaryAddress}>
                      <button
                        type="button"
                        onClick={() => setNewPrimaryAddress(!newPrimaryAddress)}
                      >
                        <img src={checked} alt="Item selecionado" />
                      </button>
                      <strong>Definir como endereço principal</strong>
                    </StartStop>
                    {addresses.length !== 0 && (
                      <UseAddress onClick={() => setNewAddress(false)}>
                        <small>Usar um endereço já registado</small>
                      </UseAddress>
                    )}
                  </div>
                ) : (
                  <div
                    style={
                      isDesktop
                        ? { display: 'flex' }
                        : {
                            display: 'flex',
                            flexDirection: 'column',
                          }
                    }
                  >
                    <StartStop selected={newPrimaryAddress}>
                      <button
                        type="button"
                        onClick={() => setNewPrimaryAddress(!newPrimaryAddress)}
                      >
                        <img src={checked} alt="Item selecionado" />
                      </button>
                      <strong>Definir como endereço principal</strong>
                    </StartStop>
                    <UseAddress
                      onClick={() => {
                        setNewAddress(true);
                        shippingInfoRef.current.reset();
                        setResidence('');
                        setZipcode('');
                      }}
                      isDesktop={isDesktop}
                    >
                      <small>Registar um novo endereço</small>
                    </UseAddress>
                  </div>
                )}
              </div>
            </InfoContainer>
          </div>
        </Content>
        <Content
          style={
            isDesktop
              ? {
                  height: 55,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  marginTop: 40,
                }
              : {
                  height: 118,
                  marginTop: 40,
                }
          }
          isDesktop={isDesktop}
        >
          <Button
            color="#2CBDD3"
            shadowColor="#26A5BB"
            style={{ width: 197, marginTop: 0 }}
            onClick={() => history.push('/cesto')}
          >
            Editar&nbsp;<b>Produtos</b>
          </Button>
          <Title style={isDesktop ? { marginLeft: 685 } : { marginTop: 30 }}>
            Resumo
          </Title>
        </Content>

        <Content style={{ marginTop: 20 }} isDesktop={isDesktop}>
          <div>
            <ItemsList length={cart.length} breakpoint={12}>
              {cart.map((item, index) => (
                <Item
                  key={item.id}
                  item={item}
                  index={index}
                  isDesktop={isDesktop}
                />
              ))}
            </ItemsList>
            <TextArea
              title="Se não encontrou o que procura, digite abaixo que iremos verificar para si."
              name="notes"
              placeholder="Informe aqui"
              style={
                isDesktop
                  ? { width: 840, height: 108 }
                  : { width: '100%', height: 108 }
              }
              inputStyle={{ height: 87 }}
              error={false}
            />
          </div>
          <CheckoutDetails isDesktop={isDesktop}>
            <CheckoutItem>
              <h1>Produtos</h1>
              <h2>€&nbsp;{price}</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Cashback</h1>
              <h2 style={{ color: '#ff9d22' }}>
                {totalCashback === '0.00' ? '---' : `€ ${totalCashback}`}
              </h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Economizou</h1>
              <h2>
                €&nbsp;{saved === '0.00' ? '0.00' : formatPrice(saved - price)}
              </h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Crédito Disponível</h1>
              <h2 style={{ color: '#0CB68B' }}>€&nbsp;{clientCback}</h2>
            </CheckoutItem>
            <CheckoutItem style={{ height: 77 }}>
              <div style={{ display: 'flex', width: '100%' }}>
                {loadingCoupon ? (
                  <LoadingCoupon onClick={() => setCouponIsValid(false)}>
                    <FaSpinner color="#fff" size={20} />
                  </LoadingCoupon>
                ) : couponIsValid ? (
                  <CouponIsValid
                    onMouseOver={() => setHoverCouponValid(true)}
                    onMouseLeave={() => setHoverCouponValid(false)}
                    onClick={() => {
                      setCouponIsValid(false);
                      setCouponDiscount(null);
                    }}
                  >
                    {hoverCouponValid ? 'Remover Cupom' : 'Cupom Válido'}
                  </CouponIsValid>
                ) : (
                  <>
                    <CouponInput
                      placeholder="CUPOM"
                      value={coupon}
                      onChange={({ target: { value } }) => setCoupon(value)}
                      isDesktop={isDesktop}
                    />
                    <SendButton onClick={validateCoupon} isDesktop={isDesktop}>
                      Validar
                    </SendButton>
                  </>
                )}
              </div>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Desconto do Cupom</h1>
              <h2 style={{ color: '#0CB68B' }}>€&nbsp;0,00</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Porte</h1>
              <h2 style={{ color: '#0CB68B' }}>
                {deliveryOption === 'delivery'
                  ? shippingCost !== 0
                    ? `€ ${shippingCost}.00`
                    : 'Grátis'
                  : 'Grátis'}
              </h2>
            </CheckoutItem>
            <CheckoutItem>
              <h2>Total</h2>
              <h2 style={{ fontSize: 25, color: '#0CB68B' }}>
                €&nbsp;
                {totalPrice}
              </h2>
            </CheckoutItem>
            <ConfirmationText>
              A confirmação da sua encomenda será feita <br />
              através de contacto telefónico pelos nossos <br />
              colaboradores no dia da entrega.
            </ConfirmationText>
            <Button
              color="#1DC167"
              shadowColor="#17A75B"
              onClick={() => {
                console.log('CLICADO');
                setFinishingOrder(true);
                accountButtonRef.current.click();
                if (deliveryOption === 'delivery') {
                  console.log('blinders');
                  shippingButtonRef.current.click();
                }
              }}
              style={isDesktop ? { width: 309 } : { width: '100%' }}
              disabled={loading || processingOrder || finishingOrder}
            >
              {processingOrder ? (
                <FaSpinner color="#fff" size={20} />
              ) : (
                <b>Concluir a Encomenda</b>
              )}
            </Button>
            <SecureLogin style={{ marginTop: 23.5 }}>
              Acesso <img src={lock} alt="Lock" /> Seguro
            </SecureLogin>
          </CheckoutDetails>
        </Content>
      </Container>
      <Footer />
      {toastVisible && (
        <Toast
          status="Cupom inválido ou sua encomenda não cumpre todas as regras exigidas."
          color="#f56060"
        />
      )}
    </>
  );
}
