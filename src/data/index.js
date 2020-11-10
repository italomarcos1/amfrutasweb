import abobora from '~/assets/products/abobora@2x.png';
import agua1l from '~/assets/products/agua1l@2x.png';
import azeite from '~/assets/products/azeite@2x.png';
import frito from '~/assets/products/frito@2x.png';
import graos from '~/assets/products/graos@2x.png';
import maça from '~/assets/products/maça@2x.png';
import nata from '~/assets/products/nata@2x.png';
import pacote from '~/assets/products/pacote@2x.png';
import pao from '~/assets/products/pao@2x.png';
import suco from '~/assets/products/suco@2x.png';
import vinho from '~/assets/products/vinho@2x.png';

export default [
  {
    id: 1,
    picture: agua1l,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10,99',
    newPrice: '9,80',
    amount: 0,
  },
  {
    id: 2,
    picture: abobora,
    title: 'Abóbora',
    // oldPrice: '10,99',
    newPrice: '9,80',
    amount: 0,
  },
  {
    id: 3,
    picture: azeite,
    title: 'Azeite de Oliva Extra Virgem',
    // oldPrice: '10,99',
    newPrice: '9,80',
    amount: 0,
  },
  {
    id: 4,
    picture: frito,
    title: 'Croquete',
    oldPrice: '10,99',
    newPrice: '9,80',
    amount: 0,
  },
  {
    id: 5,
    picture: graos,
    title: 'Grãos Diversos',
    // oldPrice: '10,99',
    newPrice: '9,80',
    amount: 0,
  },
  {
    id: 6,
    picture: maça,
    title: 'Maça Verde Kg',
    oldPrice: '10,99',
    newPrice: '9,80',
    amount: 0,
  },
];

export const categories = [
  {
    id: 1,
    name: 'Frutas',
    image: maça,
  },
  {
    id: 2,
    name: 'Horta e Couves',
    image: abobora,
  },
  {
    id: 3,
    name: 'Pão e Ovos',
    image: pao,
  },
  {
    id: 4,
    name: 'Sumos e Néctares',
    image: suco,
  },
  {
    id: 5,
    name: 'Vinhos',
    image: vinho,
  },
  {
    id: 6,
    name: 'Águas',
    image: agua1l,
  },
  {
    id: 7,
    name: 'Leite e Derivados',
    image: nata,
  },
  {
    id: 8,
    name: 'Mercearia',
    image: azeite,
  },
  {
    id: 9,
    name: 'Leguminosas',
    image: graos,
  },
  {
    id: 10,
    name: 'Produtos de Higiene Pessoal',
    image: pacote,
  },
];

export const menuCategories = [
  { id: 1, title: 'Animais', childrenCategories: [] },
  { id: 2, title: 'Bebé', childrenCategories: [{ id: 1, title: 'Teste' }] },
  {
    id: 3,
    title: 'Bebidas',
    childrenCategories: [
      { id: 1, title: 'Águas' },
      { id: 2, title: 'Cervejas' },
      { id: 3, title: 'Chá, Café e Achocolatados' },
      { id: 4, title: 'Destilados' },
    ],
  },
  { id: 4, title: 'Biológicas', childrenCategories: [] },
  { id: 5, title: 'Cabazes', childrenCategories: [] },
  { id: 6, title: 'Charcutaria Alentejana', childrenCategories: [] },
  { id: 7, title: 'Charcutaria e Frescos', childrenCategories: [] },
  { id: 8, title: 'Citrinos', childrenCategories: [] },
  {
    id: 9,
    title: 'Congelados',
    childrenCategories: [{ id: 1, title: 'Teste' }],
  },
  { id: 10, title: 'Frutas da Época', childrenCategories: [] },
  { id: 11, title: 'Frutas', childrenCategories: [] },
  { id: 12, title: 'Gelados e Sobremesas', childrenCategories: [] },
  { id: 13, title: 'Gomas e Doces', childrenCategories: [] },
  {
    id: 14,
    title: 'Hortículas',
    childrenCategories: [
      { id: 1, title: 'Alfaces' },
      { id: 2, title: 'Cenouras' },
    ],
  },
  { id: 15, title: 'Leguminosas', childrenCategories: [] },
  { id: 16, title: 'Leite e Derivados', childrenCategories: [] },
  {
    id: 17,
    title: 'Limpeza',
    childrenCategories: [
      { id: 1, title: 'Produtos de Limpeza' },
      { id: 2, title: 'Desinfetantes' },
    ],
  },
  {
    id: 18,
    title: 'Mercearia',
    childrenCategories: [{ id: 1, title: 'Teste' }],
  },
  {
    id: 19,
    title: 'Pão e Ovos',
    childrenCategories: [
      { id: 1, title: 'Pão Francês' },
      { id: 1, title: 'Ovos da Granja' },
    ],
  },
  { id: 20, title: 'Produtos de Higiene Pessoal', childrenCategories: [] },
  { id: 21, title: 'Saúde e Bem Estar', childrenCategories: [] },
  { id: 22, title: 'Tropicais', childrenCategories: [] },
];

export const products = [
  {
    id: 1,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 2,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 3,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 4,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 5,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 6,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 7,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
  {
    id: 8,
    picture: frito,
    title: 'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
    oldPrice: '10.99',
    newPrice: '9.80',
    amount: 0,
  },
];

export const periodicProducts = [
  {
    id: 1,
    picture: frito,
    selected: true,
  },
  {
    id: 2,
    picture: frito,
    selected: true,
  },
  {
    id: 3,
    picture: frito,
    selected: true,
  },
  {
    id: 4,
    picture: frito,
    selected: false,
  },
  {
    id: 5,
    picture: frito,
    selected: false,
  },
  {
    id: 6,
    picture: frito,
    selected: true,
  },
  {
    id: 7,
    picture: frito,
    selected: true,
  },
  {
    id: 8,
    picture: frito,
    selected: false,
  },
];

export const phoneCodes = [
  { code: '93', country: 'AFG' },
  { code: '355', country: 'ALB' },
  { code: '213', country: 'DZA' },
  { code: '1-684', country: 'ASM' },
  { code: '376', country: 'AND' },
  { code: '244', country: 'AGO' },
  { code: '1-264', country: 'AIA' },
  { code: '672', country: 'ATA' },
  { code: '1-268', country: 'ATG' },
  { code: '54', country: 'ARG' },
  { code: '374', country: 'ARM' },
  { code: '297', country: 'ABW' },
  { code: '61', country: 'AUS' },
  { code: '43', country: 'AUT' },
  { code: '994', country: 'AZE' },
  { code: '1-242', country: 'BHS' },
  { code: '973', country: 'BHR' },
  { code: '880', country: 'BGD' },
  { code: '1-246', country: 'BRB' },
  { code: '375', country: 'BLR' },
  { code: '32', country: 'BEL' },
  { code: '501', country: 'BLZ' },
  { code: '229', country: 'BEN' },
  { code: '1-441', country: 'BMU' },
  { code: '975', country: 'BTN' },
  { code: '591', country: 'BOL' },
  { code: '387', country: 'BIH' },
  { code: '267', country: 'BWA' },
  { code: '55', country: 'BRA' },
  { code: '246', country: 'IOT' },
  { code: '1-284', country: 'VGB' },
  { code: '673', country: 'BRN' },
  { code: '359', country: 'BGR' },
  { code: '226', country: 'BFA' },
  { code: '257', country: 'BDI' },
  { code: '855', country: 'KHM' },
  { code: '237', country: 'CMR' },
  { code: '1', country: 'CAN' },
  { code: '238', country: 'CPV' },
  { code: '1-345', country: 'CYM' },
  { code: '236', country: 'CAF' },
  { code: '235', country: 'TCD' },
  { code: '56', country: 'CHL' },
  { code: '86', country: 'CHN' },
  { code: '61', country: 'CXR' },
  { code: '61', country: 'CCK' },
  { code: '57', country: 'COL' },
  { code: '269', country: 'COM' },
  { code: '682', country: 'COK' },
  { code: '506', country: 'CRI' },
  { code: '385', country: 'HRV' },
  { code: '53', country: 'CUB' },
  { code: '599', country: 'CUW' },
  { code: '357', country: 'CYP' },
  { code: '420', country: 'CZE' },
  { code: '243', country: 'COD' },
  { code: '45', country: 'DNK' },
  { code: '253', country: 'DJI' },
  { code: '1-767', country: 'DMA' },
  { code: '1-809', country: 'DOM' },
  { code: '1-829', country: 'DOM' },
  { code: '1-849', country: 'DOM' },
  { code: '670', country: 'TLS' },
  { code: '593', country: 'ECU' },
  { code: '20', country: 'EGY' },
  { code: '503', country: 'SLV' },
  { code: '240', country: 'GNQ' },
  { code: '291', country: 'ERI' },
  { code: '372', country: 'EST' },
  { code: '251', country: 'ETH' },
  { code: '500', country: 'FLK' },
  { code: '298', country: 'FRO' },
  { code: '679', country: 'FJI' },
  { code: '358', country: 'FIN' },
  { code: '33', country: 'FRA' },
  { code: '689', country: 'PYF' },
  { code: '241', country: 'GAB' },
  { code: '220', country: 'GMB' },
  { code: '995', country: 'GEO' },
  { code: '49', country: 'DEU' },
  { code: '233', country: 'GHA' },
  { code: '350', country: 'GIB' },
  { code: '30', country: 'GRC' },
  { code: '299', country: 'GRL' },
  { code: '1-473', country: 'GRD' },
  { code: '1-671', country: 'GUM' },
  { code: '502', country: 'GTM' },
  { code: '44-1481', country: 'GGY' },
  { code: '224', country: 'GIN' },
  { code: '245', country: 'GNB' },
  { code: '592', country: 'GUY' },
  { code: '509', country: 'HTI' },
  { code: '504', country: 'HND' },
  { code: '852', country: 'HKG' },
  { code: '36', country: 'HUN' },
  { code: '354', country: 'ISL' },
  { code: '91', country: 'IND' },
  { code: '62', country: 'IDN' },
  { code: '98', country: 'IRN' },
  { code: '964', country: 'IRQ' },
  { code: '353', country: 'IRL' },
  { code: '44-1624', country: 'IMN' },
  { code: '972', country: 'ISR' },
  { code: '39', country: 'ITA' },
  { code: '225', country: 'CIV' },
  { code: '1-876', country: 'JAM' },
  { code: '81', country: 'JPN' },
  { code: '44-1534', country: 'JEY' },
  { code: '962', country: 'JOR' },
  { code: '7', country: 'KAZ' },
  { code: '254', country: 'KEN' },
  { code: '686', country: 'KIR' },
  { code: '383', country: 'XKX' },
  { code: '965', country: 'KWT' },
  { code: '996', country: 'KGZ' },
  { code: '856', country: 'LAO' },
  { code: '371', country: 'LVA' },
  { code: '961', country: 'LBN' },
  { code: '266', country: 'LSO' },
  { code: '231', country: 'LBR' },
  { code: '218', country: 'LBY' },
  { code: '423', country: 'LIE' },
  { code: '370', country: 'LTU' },
  { code: '352', country: 'LUX' },
  { code: '853', country: 'MAC' },
  { code: '389', country: 'MKD' },
  { code: '261', country: 'MDG' },
  { code: '265', country: 'MWI' },
  { code: '60', country: 'MYS' },
  { code: '960', country: 'MDV' },
  { code: '223', country: 'MLI' },
  { code: '356', country: 'MLT' },
  { code: '692', country: 'MHL' },
  { code: '222', country: 'MRT' },
  { code: '230', country: 'MUS' },
  { code: '262', country: 'MYT' },
  { code: '52', country: 'MEX' },
  { code: '691', country: 'FSM' },
  { code: '373', country: 'MDA' },
  { code: '377', country: 'MCO' },
  { code: '976', country: 'MNG' },
  { code: '382', country: 'MNE' },
  { code: '1-664', country: 'MSR' },
  { code: '212', country: 'MAR' },
  { code: '258', country: 'MOZ' },
  { code: '95', country: 'MMR' },
  { code: '264', country: 'NAM' },
  { code: '674', country: 'NRU' },
  { code: '977', country: 'NPL' },
  { code: '31', country: 'NLD' },
  { code: '599', country: 'ANT' },
  { code: '687', country: 'NCL' },
  { code: '64', country: 'NZL' },
  { code: '505', country: 'NIC' },
  { code: '227', country: 'NER' },
  { code: '234', country: 'NGA' },
  { code: '683', country: 'NIU' },
  { code: '850', country: 'PRK' },
  { code: '1-670', country: 'MNP' },
  { code: '47', country: 'NOR' },
  { code: '968', country: 'OMN' },
  { code: '92', country: 'PAK' },
  { code: '680', country: 'PLW' },
  { code: '970', country: 'PSE' },
  { code: '507', country: 'PAN' },
  { code: '675', country: 'PNG' },
  { code: '595', country: 'PRY' },
  { code: '51', country: 'PER' },
  { code: '63', country: 'PHL' },
  { code: '64', country: 'PCN' },
  { code: '48', country: 'POL' },
  { code: '351', country: 'PRT' },
  { code: '1-787', country: 'PRI' },
  { code: '1-939', country: 'PRI' },
  { code: '974', country: 'QAT' },
  { code: '242', country: 'COG' },
  { code: '262', country: 'REU' },
  { code: '40', country: 'ROU' },
  { code: '7', country: 'RUS' },
  { code: '250', country: 'RWA' },
  { code: '590', country: 'BLM' },
  { code: '290', country: 'SHN' },
  { code: '1-869', country: 'KNA' },
  { code: '1-758', country: 'LCA' },
  { code: '590', country: 'MAF' },
  { code: '508', country: 'SPM' },
  { code: '1-784', country: 'VCT' },
  { code: '685', country: 'WSM' },
  { code: '378', country: 'SMR' },
  { code: '239', country: 'STP' },
  { code: '966', country: 'SAU' },
  { code: '221', country: 'SEN' },
  { code: '381', country: 'SRB' },
  { code: '248', country: 'SYC' },
  { code: '232', country: 'SLE' },
  { code: '65', country: 'SGP' },
  { code: '1-721', country: 'SXM' },
  { code: '421', country: 'SVK' },
  { code: '386', country: 'SVN' },
  { code: '677', country: 'SLB' },
  { code: '252', country: 'SOM' },
  { code: '27', country: 'ZAF' },
  { code: '82', country: 'KOR' },
  { code: '211', country: 'SSD' },
  { code: '34', country: 'ESP' },
  { code: '94', country: 'LKA' },
  { code: '249', country: 'SDN' },
  { code: '597', country: 'SUR' },
  { code: '47', country: 'SJM' },
  { code: '268', country: 'SWZ' },
  { code: '46', country: 'SWE' },
  { code: '41', country: 'CHE' },
  { code: '963', country: 'SYR' },
  { code: '886', country: 'TWN' },
  { code: '992', country: 'TJK' },
  { code: '255', country: 'TZA' },
  { code: '66', country: 'THA' },
  { code: '228', country: 'TGO' },
  { code: '690', country: 'TKL' },
  { code: '676', country: 'TON' },
  { code: '1-868', country: 'TTO' },
  { code: '216', country: 'TUN' },
  { code: '90', country: 'TUR' },
  { code: '993', country: 'TKM' },
  { code: '1-649', country: 'TCA' },
  { code: '688', country: 'TUV' },
  { code: '1-340', country: 'VIR' },
  { code: '256', country: 'UGA' },
  { code: '380', country: 'UKR' },
  { code: '971', country: 'ARE' },
  { code: '44', country: 'GBR' },
  { code: '1', country: 'USA' },
  { code: '598', country: 'URY' },
  { code: '998', country: 'UZB' },
  { code: '678', country: 'VUT' },
  { code: '379', country: 'VAT' },
  { code: '58', country: 'VEN' },
  { code: '84', country: 'VNM' },
  { code: '681', country: 'WLF' },
  { code: '212', country: 'ESH' },
  { code: '967', country: 'YEM' },
  { code: '260', country: 'ZMB' },
  { code: '263', country: 'ZWE' },
];
