import React, { Component } from 'react';
import enriched_network from '../enrichedNetwork.png';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function SerumGC() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        spacing: 4
      }),
    [prefersDarkMode],
  );
  const useStyles = makeStyles((theme) => ({
  table: {
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundColor: `rgba(0,0,0,0.725)`,
    backgroundBlendMode: 'multiply',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const classes = useStyles();

const columns: GridColDef = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'compound',
    headerName: 'Compound',
    width: 200,
    editable: false,
  },
  {
    field: 'p',
    headerName: 'P-Value',
    width: 170,
    editable: false,
  },
  {
    field: 'p_adj',
    headerName: 'P-Value (Adjusted)',
    width: 170,
    editable: false,
  },
  {
    field: 'fc',
    headerName: 'FC: POST/PRE',
    width: 170,
  },
];

const rows: GridRowsProp = [
  {id:1, compound:"xylitol", p:0.833658485, p_adj:0.959881424, fc:0.960869565},
  {id:2, compound:"xanthine", p:0.906755709, p_adj:0.985031625, fc:1.117540687},
  {id:3, compound:"valine", p:0.871224517, p_adj:0.969015024, fc:0.918879523},
  {id:4, compound:"uridine", p:0.285917599, p_adj:0.880987583, fc:1.023650697},
  {id:5, compound:"uric.acid", p:0.866692931, p_adj:0.969015024, fc:0.934900807},
  {id:6, compound:"urea", p:0.809021575, p_adj:0.956810569, fc:0.993351658},
  {id:7, compound:"tyrosine", p:0.66014606, p_adj:0.922609507, fc:1.016270324},
  {id:8, compound:"tryptophan", p:0.423221401, p_adj:0.881486612, fc:1.043736478},
  {id:9, compound:"trehalose", p:0.353399222, p_adj:0.880987583, fc:0.994513032},
  {id:10, compound:"trans.4.hydroxyproline", p:0.646929875, p_adj:0.922609507, fc:1.02489255},
  {id:11, compound:"tocopherol.gamma.", p:0.328533551, p_adj:0.880987583, fc:0.874441964},
  {id:12, compound:"tocopherol.alpha.", p:0.912989804, p_adj:0.985031625, fc:0.955027027},
  {id:13, compound:"threonine", p:0.057936993, p_adj:0.77703074, fc:1.179981486},
  {id:14, compound:"threonic.acid", p:0.179706019, p_adj:0.880987583, fc:1.217500224},
  {id:15, compound:"threitol", p:0.395544441, p_adj:0.880987583, fc:1.158241758},
  {id:16, compound:"taurine", p:0.746746919, p_adj:0.956810569, fc:1.068241789},
  {id:17, compound:"sucrose", p:0.183114492, p_adj:0.880987583, fc:0.775609756},
  {id:18, compound:"succinic.acid", p:0.771578807, p_adj:0.956810569, fc:1.052734375},
  {id:19, compound:"stearic.acid", p:0.924555158, p_adj:0.985031625, fc:1.029081934},
  {id:20, compound:"sorbitol", p:0.414899351, p_adj:0.880987583, fc:0.961438756},
  {id:21, compound:"serine", p:0.391418222, p_adj:0.880987583, fc:1.042774233},
  {id:22, compound:"salicylic.acid", p:0.672363062, p_adj:0.922609507, fc:1.165257494},
  {id:23, compound:"ribose", p:0.020776694, p_adj:0.720058853, fc:0.793012525},
  {id:24, compound:"ribonic.acid", p:0.17307158, p_adj:0.880987583, fc:1.36523126},
  {id:25, compound:"ribitol", p:0.423174296, p_adj:0.881486612, fc:1.064356436},
  {id:26, compound:"pyrophosphate", p:0.575896036, p_adj:0.90183871, fc:0.977515458},
  {id:27, compound:"pseudo.uridine", p:0.38924028, p_adj:0.880987583, fc:0.980904037},
  {id:28, compound:"propane.1.3.diol.NIST", p:0.667111249, p_adj:0.922609507, fc:1.075359271},
  {id:29, compound:"proline", p:0.337482328, p_adj:0.880987583, fc:0.913231587},
  {id:30, compound:"pipecolinic.acid", p:0.631650442, p_adj:0.917998642, fc:0.917525773},
  {id:31, compound:"phosphoethanolamine", p:0.418429506, p_adj:0.881486612, fc:1.129366106},
  {id:32, compound:"phosphate", p:0.407264261, p_adj:0.880987583, fc:1.080362727},
  {id:33, compound:"phenylethylamine", p:0.588247284, p_adj:0.90183871, fc:0.702572347},
  {id:34, compound:"phenylalanine", p:0.028848621, p_adj:0.720058853, fc:1.098831493},
  {id:35, compound:"pelargonic.acid", p:0.464442283, p_adj:0.90183871, fc:0.856510392},
  {id:36, compound:"palmitoleic.acid", p:0.19751584, p_adj:0.880987583, fc:0.925},
  {id:37, compound:"palmitic.acid", p:0.401212212, p_adj:0.880987583, fc:1.023388533},
  {id:38, compound:"oxoproline", p:0.598087778, p_adj:0.90183871, fc:0.940245142},
  {id:39, compound:"oxalic.acid", p:0.143432877, p_adj:0.880987583, fc:1.024273215},
  {id:40, compound:"ornithine", p:0.468993638, p_adj:0.90183871, fc:1.083602818},
  {id:41, compound:"oleic.acid", p:0.554838483, p_adj:0.90183871, fc:1.0457598},
  {id:42, compound:"oleamide.NIST", p:0.151463747, p_adj:0.880987583, fc:0.760840999},
  {id:43, compound:"N.methylglutamic.acid", p:0.702696037, p_adj:0.940411333, fc:1.15074068},
  {id:44, compound:"N.methylalanine", p:0.842991436, p_adj:0.963786106, fc:1.119103684},
  {id:45, compound:"n.acetylglutamate", p:0.775358897, p_adj:0.956810569, fc:0.894268423},
  {id:46, compound:"myristic.acid", p:0.669026657, p_adj:0.922609507, fc:1.102733686},
  {id:47, compound:"myo.inositol", p:0.147695899, p_adj:0.880987583, fc:0.86735221},
  {id:48, compound:"methionine.sulfoxide", p:0.054452894, p_adj:0.77703074, fc:1.513803681},
  {id:49, compound:"methionine", p:0.852483814, p_adj:0.963786106, fc:0.960458799},
  {id:50, compound:"methanolphosphate", p:0.567470629, p_adj:0.90183871, fc:1.039578483},
  {id:51, compound:"mannose", p:0.794746846, p_adj:0.956810569, fc:1.011504544},
  {id:52, compound:"malic.acid", p:0.054743847, p_adj:0.77703074, fc:0.951890034},
  {id:53, compound:"maleimide", p:0.328940379, p_adj:0.880987583, fc:0.916587226},
  {id:54, compound:"lyxitol", p:0.021045182, p_adj:0.720058853, fc:0.554219282},
  {id:55, compound:"lysine", p:0.823860235, p_adj:0.958727035, fc:1.045250708},
  {id:56, compound:"linoleic.acid", p:0.499966562, p_adj:0.90183871, fc:0.987196323},
  {id:57, compound:"leucine", p:0.314899157, p_adj:0.880987583, fc:1.116534148},
  {id:58, compound:"lauric.acid", p:0.286215701, p_adj:0.880987583, fc:0.769559102},
  {id:59, compound:"lactic.acid", p:0.560920713, p_adj:0.90183871, fc:1.300615968},
  {id:60, compound:"lactamide", p:0.759106246, p_adj:0.956810569, fc:1.227334235},
  {id:61, compound:"isothreonic.acid", p:0.410708236, p_adj:0.880987583, fc:1.039541759},
  {id:62, compound:"isoleucine", p:0.06919082, p_adj:0.808049937, fc:1.068191272},
  {id:63, compound:"inosine", p:0.187191982, p_adj:0.880987583, fc:0.692883323},
  {id:64, compound:"indole.3.lactate", p:0.831675009, p_adj:0.959881424, fc:0.963346815},
  {id:65, compound:"indole.3.acetate", p:0.169628163, p_adj:0.880987583, fc:0.836911942},
  {id:66, compound:"hypoxanthine", p:0.063906868, p_adj:0.77703074, fc:0.868810618},
  {id:67, compound:"hydroxylamine", p:0.819287337, p_adj:0.956810569, fc:0.910153802},
  {id:68, compound:"hydroxycarbamate.NIST", p:0.413806391, p_adj:0.880987583, fc:0.985719626},
  {id:69, compound:"histidine", p:0.595465006, p_adj:0.90183871, fc:1.027769825},
  {id:70, compound:"hippuric.acid", p:0.116959873, p_adj:0.880987583, fc:0.907146877},
  {id:71, compound:"hexuronic.acid", p:0.457590588, p_adj:0.90183871, fc:0.664098613},
  {id:72, compound:"hexitol", p:0.030826769, p_adj:0.720058853, fc:0.655757334},
  {id:73, compound:"heptadecanoic.acid", p:0.857903934, p_adj:0.964036379, fc:1.047742413},
  {id:74, compound:"guanosine", p:0.554308089, p_adj:0.90183871, fc:1.135951662},
  {id:75, compound:"glycolic.acid", p:0.047418763, p_adj:0.77703074, fc:0.8791423},
  {id:76, compound:"glycine", p:0.994869479, p_adj:0.999609968, fc:0.944862678},
  {id:77, compound:"glycerol.alpha.phosphate", p:0.218405331, p_adj:0.880987583, fc:0.864864865},
  {id:78, compound:"glycerol", p:0.265323046, p_adj:0.880987583, fc:0.987243465},
  {id:79, compound:"glyceric.acid", p:0.592254704, p_adj:0.90183871, fc:1.158994885},
  {id:80, compound:"glutamine", p:0.665350738, p_adj:0.922609507, fc:1.076184448},
  {id:81, compound:"glutamic.acid", p:0.811412273, p_adj:0.956810569, fc:1.057846411},
  {id:82, compound:"glucose", p:0.933536076, p_adj:0.985031625, fc:1.021415469},
  {id:83, compound:"gluconic.acid", p:0.478605579, p_adj:0.90183871, fc:1.036334913},
  {id:84, compound:"galactitol", p:0.323193657, p_adj:0.880987583, fc:1.043122677},
  {id:85, compound:"fumaric.acid", p:0.228331388, p_adj:0.880987583, fc:1.188368336},
  {id:86, compound:"fucose", p:0.586807598, p_adj:0.90183871, fc:0.904836193},
  {id:87, compound:"erythronic.acid.lactone", p:0.990118984, p_adj:0.999609968, fc:0.980181668},
  {id:88, compound:"erythritol", p:0.252521457, p_adj:0.880987583, fc:1.020841931},
  {id:89, compound:"dodecanol", p:0.03260382, p_adj:0.720058853, fc:1.183175034},
  {id:90, compound:"dehydroascorbic.acid", p:0.34410571, p_adj:0.880987583, fc:0.734728805},
  {id:91, compound:"dehydroabietic.acid", p:0.159005077, p_adj:0.880987583, fc:0.787174721},
  {id:92, compound:"cystine", p:0.187656163, p_adj:0.880987583, fc:0.795625644},
  {id:93, compound:"cysteine", p:0.817125681, p_adj:0.956810569, fc:1.143010177},
  {id:94, compound:"creatinine", p:0.370814261, p_adj:0.880987583, fc:0.958419958},
  {id:95, compound:"conduritol.beta.epoxide", p:0.238821448, p_adj:0.880987583, fc:1.240938166},
  {id:96, compound:"citrulline", p:0.811231813, p_adj:0.956810569, fc:1.034423408},
  {id:97, compound:"citric.acid", p:0.301342366, p_adj:0.880987583, fc:1.057912713},
  {id:98, compound:"cholesterol", p:0.72419456, p_adj:0.944913633, fc:0.985811161},
  {id:99, compound:"caprylic.acid", p:0.741412288, p_adj:0.956810569, fc:1.023803799},
  {id:100, compound:"capric.acid", p:0.505335464, p_adj:0.90183871, fc:1.144939966},
  {id:101, compound:"beta.alanine", p:0.725092885, p_adj:0.944913633, fc:1.052677788},
  {id:102, compound:"benzylalcohol", p:0.400793182, p_adj:0.880987583, fc:1.234711912},
  {id:103, compound:"benzoic.acid", p:0.465740263, p_adj:0.90183871, fc:1.07823909},
  {id:104, compound:"aspartic.acid", p:0.5039931, p_adj:0.90183871, fc:1.026571429},
  {id:105, compound:"asparagine", p:0.023529072, p_adj:0.720058853, fc:1.120087336},
  {id:106, compound:"arachidonic.acid", p:0.574253165, p_adj:0.90183871, fc:1.094967046},
  {id:107, compound:"arachidic.acid", p:0.316607813, p_adj:0.880987583, fc:1.195339172},
  {id:108, compound:"aminomalonate", p:0.596398909, p_adj:0.90183871, fc:1.048747298},
  {id:109, compound:"alanine", p:0.457172026, p_adj:0.90183871, fc:0.999713067},
  {id:110, compound:"adipic.acid", p:0.190338974, p_adj:0.880987583, fc:1.028205128},
  {id:111, compound:"adenosine.5.monophosphate", p:0.758765878, p_adj:0.956810569, fc:0.882352941},
  {id:112, compound:"adenosine", p:0.941021388, p_adj:0.985031625, fc:0.880872483},
  {id:113, compound:"X6.deoxyglucitol", p:0.184356562, p_adj:0.880987583, fc:0.955069465},
  {id:114, compound:"X4.hydroxybutyric.acid", p:0.846288415, p_adj:0.963786106, fc:0.983870968},
  {id:115, compound:"X3.hydroxybutyric.acid", p:0.6066593, p_adj:0.90183871, fc:1.289641491},
  {id:116, compound:"X3.6.anhydro.D.galactose", p:0.664853877, p_adj:0.922609507, fc:1.052343564},
  {id:117, compound:"X2.ketoisocaproic.acid", p:0.071755126, p_adj:0.809100905, fc:0.56836799},
  {id:118, compound:"X2.hydroxyglutaric.acid", p:0.135990972, p_adj:0.880987583, fc:0.721238938},
  {id:119, compound:"X2.hydroxybutanoic.acid", p:0.583960243, p_adj:0.90183871, fc:1.057192476},
  {id:120, compound:"X2.deoxytetronic.acid", p:0.177984384, p_adj:0.880987583, fc:0.809756098},
  {id:121, compound:"X1.monopalmitin", p:0.4054523, p_adj:0.880987583, fc:0.913078798},
  {id:122, compound:"X1.methylgalactose.NIST", p:0.94016985, p_adj:0.985031625, fc:0.586716966},
  {id:123, compound:"X610256", p:0.929197096, p_adj:0.985031625, fc:1.21038961},
  {id:124, compound:"X204994", p:0.590690643, p_adj:0.90183871, fc:1.0997151},
  {id:125, compound:"X203812", p:0.88461205, p_adj:0.974221687, fc:1.10410744},
  {id:126, compound:"X196901", p:0.784539511, p_adj:0.956810569, fc:0.938533277},
  {id:127, compound:"X192876", p:0.981084344, p_adj:0.999609968, fc:0.927460682},
  {id:128, compound:"X191802", p:0.714681495, p_adj:0.942342132, fc:1.065940367},
  {id:129, compound:"X183508", p:0.214074563, p_adj:0.880987583, fc:1.554098361},
  {id:130, compound:"X183433", p:0.098482313, p_adj:0.880987583, fc:1.082119817},
  {id:131, compound:"X183139", p:0.548119701, p_adj:0.90183871, fc:0.87741686},
  {id:132, compound:"X183115", p:0.019375591, p_adj:0.720058853, fc:0.739495798},
  {id:133, compound:"X183049", p:0.671452267, p_adj:0.922609507, fc:0.976917528},
  {id:134, compound:"X172624", p:0.202466578, p_adj:0.880987583, fc:1.093471602},
  {id:135, compound:"X171564", p:0.278708733, p_adj:0.880987583, fc:1.016928159},
  {id:136, compound:"X171303", p:0.60637866, p_adj:0.90183871, fc:1.03996125},
  {id:137, compound:"X170232", p:0.501419534, p_adj:0.90183871, fc:0.764705882},
  {id:138, compound:"X170069", p:0.488792797, p_adj:0.90183871, fc:0.87702165},
  {id:139, compound:"X168759", p:0.380238638, p_adj:0.880987583, fc:0.977570093},
  {id:140, compound:"X161878", p:0.314346393, p_adj:0.880987583, fc:0.957825371},
  {id:141, compound:"X161875", p:0.627475265, p_adj:0.916001837, fc:0.990673575},
  {id:142, compound:"X146277", p:0.851441561, p_adj:0.963786106, fc:0.948328267},
  {id:143, compound:"X136398", p:0.817959253, p_adj:0.956810569, fc:1.097165992},
  {id:144, compound:"X135619", p:0.708515236, p_adj:0.940411333, fc:1.172353962},
  {id:145, compound:"X135260", p:0.228393386, p_adj:0.880987583, fc:1.067688378},
  {id:146, compound:"X134336", p:0.50481819, p_adj:0.90183871, fc:0.992972743},
  {id:147, compound:"X133612", p:0.318938861, p_adj:0.880987583, fc:1.268714012},
  {id:148, compound:"X133605", p:0.531025949, p_adj:0.90183871, fc:1.089866157},
  {id:149, compound:"X133340", p:0.373564868, p_adj:0.880987583, fc:1.080204778},
  {id:150, compound:"X133242", p:0.169744361, p_adj:0.880987583, fc:1.087749783},
  {id:151, compound:"X132976", p:0.024235618, p_adj:0.720058853, fc:0.7886873},
  {id:152, compound:"X131620", p:0.553949511, p_adj:0.90183871, fc:1.067398616},
  {id:153, compound:"X129225", p:0.692894531, p_adj:0.932413628, fc:0.888825623},
  {id:154, compound:"X126423", p:0.991364758, p_adj:0.999609968, fc:1.099479468},
  {id:155, compound:"X126354", p:0.064158501, p_adj:0.77703074, fc:0.660098522},
  {id:156, compound:"X126345", p:0.003062021, p_adj:0.720058853, fc:1.319096509},
  {id:157, compound:"X124996", p:0.385750954, p_adj:0.880987583, fc:0.776904067},
  {id:158, compound:"X124903", p:0.3035923, p_adj:0.880987583, fc:1.007668559},
  {id:159, compound:"X122191", p:0.245184722, p_adj:0.880987583, fc:1.421732114},
  {id:160, compound:"X121890", p:0.403744116, p_adj:0.880987583, fc:1.060949299},
  {id:161, compound:"X121468", p:0.291647616, p_adj:0.880987583, fc:1.295774648},
  {id:162, compound:"X121467", p:0.237137666, p_adj:0.880987583, fc:1.145652174},
  {id:163, compound:"X121002", p:0.292987629, p_adj:0.880987583, fc:1.087410307},
  {id:164, compound:"X120744", p:0.655416285, p_adj:0.922609507, fc:1.110340343},
  {id:165, compound:"X120562", p:0.349092011, p_adj:0.880987583, fc:0.887739294},
  {id:166, compound:"X119167", p:0.811707462, p_adj:0.956810569, fc:1.002576904},
  {id:167, compound:"X119129", p:0.925870112, p_adj:0.985031625, fc:1.014965001},
  {id:168, compound:"X119054", p:0.802127009, p_adj:0.956810569, fc:1.052423343},
  {id:169, compound:"X119026", p:0.339211003, p_adj:0.880987583, fc:0.784660767},
  {id:170, compound:"X119023", p:0.945508989, p_adj:0.985031625, fc:0.888354701},
  {id:171, compound:"X112556", p:0.659460641, p_adj:0.922609507, fc:1.074154068},
  {id:172, compound:"X112530", p:0.133198911, p_adj:0.880987583, fc:0.917933131},
  {id:173, compound:"X112487", p:0.523470258, p_adj:0.90183871, fc:1.081239041},
  {id:174, compound:"X112264", p:0.188671482, p_adj:0.880987583, fc:0.694025974},
  {id:175, compound:"X110570", p:0.531397202, p_adj:0.90183871, fc:1.153687316},
  {id:176, compound:"X110501", p:0.854733856, p_adj:0.963786106, fc:1.285883397},
  {id:177, compound:"X110321", p:0.466582642, p_adj:0.90183871, fc:1.035862069},
  {id:178, compound:"X110183", p:0.992576157, p_adj:0.999609968, fc:0.981925489},
  {id:179, compound:"X110170", p:0.22698391, p_adj:0.880987583, fc:1.228070175},
  {id:180, compound:"X110013", p:0.365401686, p_adj:0.880987583, fc:1.250310302},
  {id:181, compound:"X110008", p:0.556330578, p_adj:0.90183871, fc:0.967654987},
  {id:182, compound:"X109386", p:0.514429334, p_adj:0.90183871, fc:0.958238421},
  {id:183, compound:"X107960", p:0.966450274, p_adj:0.999185482, fc:0.909619993},
  {id:184, compound:"X107276", p:0.830047488, p_adj:0.959881424, fc:1.132111597},
  {id:185, compound:"X107274", p:0.46570525, p_adj:0.90183871, fc:1.023672425},
  {id:186, compound:"X106936", p:0.755800546, p_adj:0.956810569, fc:1.135652174},
  {id:187, compound:"X106697", p:0.404911824, p_adj:0.880987583, fc:1.172362556},
  {id:188, compound:"X105450", p:0.998093779, p_adj:0.999609968, fc:1.001278772},
  {id:189, compound:"X104123", p:0.126417229, p_adj:0.880987583, fc:0.744249914},
  {id:190, compound:"X100730", p:0.161347165, p_adj:0.880987583, fc:1.108910891},
  {id:191, compound:"X98101", p:0.056870801, p_adj:0.77703074, fc:0.615131579},
  {id:192, compound:"X98027", p:0.497293163, p_adj:0.90183871, fc:0.8},
  {id:193, compound:"X97891", p:0.999609968, p_adj:0.999609968, fc:0.928982726},
  {id:194, compound:"X97884", p:0.32637926, p_adj:0.880987583, fc:0.996610169},
  {id:195, compound:"X97708", p:0.638187976, p_adj:0.919328053, fc:0.941852118},
  {id:196, compound:"X95410", p:0.456745371, p_adj:0.90183871, fc:1.104008667},
  {id:197, compound:"X91421", p:0.941878462, p_adj:0.985031625, fc:1.143311209},
  {id:198, compound:"X88502", p:0.307361266, p_adj:0.880987583, fc:1.032596271},
  {id:199, compound:"X84721", p:0.341815103, p_adj:0.880987583, fc:1.065886383},
  {id:200, compound:"X64712", p:0.24866731, p_adj:0.880987583, fc:0.861570248},
  {id:201, compound:"X62263", p:0.24638651, p_adj:0.880987583, fc:1.53307393},
  {id:202, compound:"X50367", p:0.9410166, p_adj:0.985031625, fc:0.897315436},
  {id:203, compound:"X48428", p:0.171149079, p_adj:0.880987583, fc:1.088715401},
  {id:204, compound:"X47492", p:0.984831138, p_adj:0.999609968, fc:0.937181664},
  {id:205, compound:"X47358", p:0.497137618, p_adj:0.90183871, fc:1.03968254},
  {id:206, compound:"X47221", p:0.779936731, p_adj:0.956810569, fc:1.351542952},
  {id:207, compound:"X46292", p:0.107697577, p_adj:0.880987583, fc:1.026054003},
  {id:208, compound:"X46272", p:0.979733829, p_adj:0.999609968, fc:1.102007374},
  {id:209, compound:"X46128", p:0.265974614, p_adj:0.880987583, fc:0.911983033},
  {id:210, compound:"X43734", p:0.95568296, p_adj:0.99208993, fc:0.900478469},
  {id:211, compound:"X42525", p:0.63589989, p_adj:0.919328053, fc:1.281676413},
  {id:212, compound:"X42187", p:0.049933945, p_adj:0.77703074, fc:1.040783034},
  {id:213, compound:"X42003", p:0.469071957, p_adj:0.90183871, fc:1.037072243},
  {id:214, compound:"X41989", p:0.677144593, p_adj:0.922609507, fc:0.855054811},
  {id:215, compound:"X41985", p:0.920192213, p_adj:0.985031625, fc:1.055639098},
  {id:216, compound:"X41811", p:0.294234695, p_adj:0.880987583, fc:1.085215606},
  {id:217, compound:"X41808", p:0.102371326, p_adj:0.880987583, fc:1.127111826},
  {id:218, compound:"X41683", p:0.887822821, p_adj:0.974221687, fc:1.006999125},
  {id:219, compound:"X34146", p:0.122402503, p_adj:0.880987583, fc:0.719298246},
  {id:220, compound:"X34089", p:0.232781887, p_adj:0.880987583, fc:0.752079867},
  {id:221, compound:"X33462", p:0.293083519, p_adj:0.880987583, fc:0.898148148},
  {id:222, compound:"X33415", p:0.172532222, p_adj:0.880987583, fc:1.010244287},
  {id:223, compound:"X31962", p:0.968629351, p_adj:0.999185482, fc:0.871801052},
  {id:224, compound:"X31559", p:0.19654145, p_adj:0.880987583, fc:2.398907104},
  {id:225, compound:"X31554", p:0.707657275, p_adj:0.940411333, fc:0.973623853},
  {id:226, compound:"X31408", p:0.023342479, p_adj:0.720058853, fc:1.070362785},
  {id:227, compound:"X31359", p:0.80724701, p_adj:0.956810569, fc:0.977426637},
  {id:228, compound:"X31285", p:0.710341282, p_adj:0.940411333, fc:0.960432282},
  {id:229, compound:"X31223", p:0.351694729, p_adj:0.880987583, fc:0.802967848},
  {id:230, compound:"X23635", p:0.160479224, p_adj:0.880987583, fc:1.060542623},
  {id:231, compound:"X22863", p:0.204391274, p_adj:0.880987583, fc:0.950175131},
  {id:232, compound:"X22444", p:0.321252211, p_adj:0.880987583, fc:1.023328149},
  {id:233, compound:"X20297", p:0.921325676, p_adj:0.985031625, fc:0.690265487},
  {id:234, compound:"X18488", p:0.598571408, p_adj:0.90183871, fc:0.90655885},
  {id:235, compound:"X17664", p:0.457874857, p_adj:0.90183871, fc:1.272332169},
  {id:236, compound:"X17651", p:0.473102709, p_adj:0.90183871, fc:1.002409639},
  {id:237, compound:"X17541", p:0.405422413, p_adj:0.880987583, fc:1.065088757},
  {id:238, compound:"X17068", p:0.189406128, p_adj:0.880987583, fc:1.040287103},
  {id:239, compound:"X16794", p:0.179957921, p_adj:0.880987583, fc:1.231825525},
  {id:240, compound:"X16788", p:0.613340821, p_adj:0.903434453, fc:0.945945946},
  {id:241, compound:"X16572", p:0.836928707, p_adj:0.960265569, fc:1.077621932},
  {id:242, compound:"X14736", p:0.063713574, p_adj:0.77703074, fc:1.446850394},
  {id:243, compound:"X12444", p:0.236071397, p_adj:0.880987583, fc:0.850107066},
  {id:244, compound:"X11523", p:0.609904995, p_adj:0.902438613, fc:0.792408066},
  {id:245, compound:"X8270", p:0.522161069, p_adj:0.90183871, fc:0.699256718},
  {id:246, compound:"X7490", p:0.800120967, p_adj:0.956810569, fc:1.141339001},
  {id:247, compound:"X6767", p:0.199532572, p_adj:0.880987583, fc:1.165659008},
  {id:248, compound:"X6646", p:0.688457708, p_adj:0.932413628, fc:0.828856964},
  {id:249, compound:"X6376", p:0.508100402, p_adj:0.90183871, fc:1.108918129},
  {id:250, compound:"X6066", p:0.204830127, p_adj:0.880987583, fc:1.026235354},
  {id:251, compound:"X5990", p:0.401106101, p_adj:0.880987583, fc:1.025901943},
  {id:252, compound:"X5930", p:0.195392934, p_adj:0.880987583, fc:1.360953462},
  {id:253, compound:"X5837", p:0.759687694, p_adj:0.956810569, fc:1.084077772},
  {id:254, compound:"X5691", p:0.096137211, p_adj:0.880987583, fc:0.905776515},
  {id:255, compound:"X5483", p:0.944605652, p_adj:0.985031625, fc:1.074596774},
  {id:256, compound:"X5471", p:0.198653708, p_adj:0.880987583, fc:1.288628472},
  {id:257, compound:"X5396", p:0.591847597, p_adj:0.90183871, fc:1.058682466},
  {id:258, compound:"X5346", p:0.57499215, p_adj:0.90183871, fc:1.005487596},
  {id:259, compound:"X5276", p:0.090887677, p_adj:0.880987583, fc:0.752024503},
  {id:260, compound:"X5269", p:0.725300678, p_adj:0.944913633, fc:1.015678776},
  {id:261, compound:"X5259", p:0.287691276, p_adj:0.880987583, fc:0.897801545},
  {id:262, compound:"X5085", p:0.536557393, p_adj:0.90183871, fc:1.161388971},
  {id:263, compound:"X4986", p:0.797513817, p_adj:0.956810569, fc:1.05451448},
  {id:264, compound:"X4945", p:0.169437761, p_adj:0.880987583, fc:0.717401842},
  {id:265, compound:"X4937", p:0.507168618, p_adj:0.90183871, fc:0.969147005},
  {id:266, compound:"X4929", p:0.010703178, p_adj:0.720058853, fc:0.793936406},
  {id:267, compound:"X4898", p:0.407121452, p_adj:0.880987583, fc:0.908436214},
  {id:268, compound:"X4887", p:0.400025894, p_adj:0.880987583, fc:1.015160703},
  {id:269, compound:"X4871", p:0.540830517, p_adj:0.90183871, fc:1.568641884},
  {id:270, compound:"X4863", p:0.037113158, p_adj:0.75850016, fc:0.340163934},
  {id:271, compound:"X4793", p:0.296161248, p_adj:0.880987583, fc:1.075870647},
  {id:272, compound:"X4746", p:0.510663821, p_adj:0.90183871, fc:1.196407186},
  {id:273, compound:"X4600", p:0.379514931, p_adj:0.880987583, fc:0.810360777},
  {id:274, compound:"X4579", p:0.208399454, p_adj:0.880987583, fc:1.105339454},
  {id:275, compound:"X4577", p:0.586743998, p_adj:0.90183871, fc:1.144946809},
  {id:276, compound:"X4546", p:0.625947336, p_adj:0.916001837, fc:0.894765993},
  {id:277, compound:"X4543", p:0.75252189, p_adj:0.956810569, fc:1.01974268},
  {id:278, compound:"X4536", p:0.398416076, p_adj:0.880987583, fc:0.996244945},
  {id:279, compound:"X4531", p:0.870179362, p_adj:0.969015024, fc:0.921113689},
  {id:280, compound:"X4219", p:0.60674164, p_adj:0.90183871, fc:1.089180328},
  {id:281, compound:"X3465", p:0.328355597, p_adj:0.880987583, fc:1.199392713},
  {id:282, compound:"X3381", p:0.294030093, p_adj:0.880987583, fc:0.93904209},
  {id:283, compound:"X3228", p:0.008358878, p_adj:0.720058853, fc:1.360632184},
  {id:284, compound:"X3029", p:0.263854418, p_adj:0.880987583, fc:0.602348993},
  {id:285, compound:"X2936", p:0.509409867, p_adj:0.90183871, fc:1.040373622},
  {id:286, compound:"X2806", p:0.89896149, p_adj:0.983145174, fc:0.810143043},
  {id:287, compound:"X2575", p:0.945871346, p_adj:0.985031625, fc:1},
  {id:288, compound:"X2476", p:0.27048036, p_adj:0.880987583, fc:1.120089981},
  {id:289, compound:"X2233", p:0.797743663, p_adj:0.956810569, fc:0.960760999},
  {id:290, compound:"X2097", p:0.795220799, p_adj:0.956810569, fc:0.9440588},
  {id:291, compound:"X2061", p:0.460254339, p_adj:0.90183871, fc:1.045368464},
  {id:292, compound:"X2001", p:0.046420166, p_adj:0.77703074, fc:0.680573664},
  {id:293, compound:"X1996", p:0.160651855, p_adj:0.880987583, fc:0.878352118},
  {id:294, compound:"X1981", p:0.194147658, p_adj:0.880987583, fc:0.92074891},
  {id:295, compound:"X1941", p:0.032057541, p_adj:0.720058853, fc:1.203898051},
  {id:296, compound:"X1912", p:0.367622438, p_adj:0.880987583, fc:0.953185498},
  {id:297, compound:"X1878", p:0.062954923, p_adj:0.77703074, fc:1.150774398},
  {id:298, compound:"X1875", p:0.586362442, p_adj:0.90183871, fc:1.027075169},
  {id:299, compound:"X1704", p:0.394859992, p_adj:0.880987583, fc:0.850988343},
  {id:300, compound:"X1700", p:0.542069911, p_adj:0.90183871, fc:0.971783296},
  {id:301, compound:"X1029", p:0.007532891, p_adj:0.720058853, fc:1.243658069},
  {id:302, compound:"X915", p:0.884200154, p_adj:0.974221687, fc:0.97008144},
  {id:303, compound:"X892", p:0.692538265, p_adj:0.932413628, fc:1.383818121},
  {id:304, compound:"X816", p:0.577478491, p_adj:0.90183871, fc:1.046885035},
  {id:305, compound:"X812", p:0.401102511, p_adj:0.880987583, fc:0.895683453},
  {id:306, compound:"X657", p:0.525234837, p_adj:0.90183871, fc:1.295454545},
  {id:307, compound:"X592", p:0.434882268, p_adj:0.90004115, fc:1.12476489},
  {id:308, compound:"X573", p:0.331207028, p_adj:0.880987583, fc:0.882626974},
  {id:309, compound:"X473", p:0.299656089, p_adj:0.880987583, fc:0.920760697},
  {id:310, compound:"X462", p:0.67123686, p_adj:0.922609507, fc:0.950460829},
  {id:311, compound:"X458", p:0.255220657, p_adj:0.880987583, fc:0.643715573},
  {id:312, compound:"X453", p:0.309829406, p_adj:0.880987583, fc:1.205573733},
  {id:313, compound:"X443", p:0.258141694, p_adj:0.880987583, fc:1.210602971},
  {id:314, compound:"X307", p:0.456708171, p_adj:0.90183871, fc:1.093300579},
  {id:315, compound:"X299", p:0.033030223, p_adj:0.720058853, fc:0.694065126},
  {id:316, compound:"X257", p:0.303763338, p_adj:0.880987583, fc:1.035037161},
  {id:317, compound:"X137", p:0.145340678, p_adj:0.880987583, fc:1.060685774},
  {id:318, compound:"X134", p:0.675768891, p_adj:0.922609507, fc:0.997802198},
  {id:319, compound:"X110", p:0.88528085, p_adj:0.974221687, fc:0.982545962},
  {id:320, compound:"X99", p:0.805253918, p_adj:0.956810569, fc:0.915795564},
  {id:321, compound:"X98", p:0.778779188, p_adj:0.956810569, fc:0.949604184},
  {id:322, compound:"X91", p:0.790125149, p_adj:0.956810569, fc:1.023809524},
  {id:323, compound:"X62", p:0.971857564, p_adj:0.999362967, fc:1.050396499},
  {id:324, compound:"X61", p:0.135344972, p_adj:0.880987583, fc:1.19031294},
  {id:325, compound:"X54", p:0.399955455, p_adj:0.880987583, fc:0.940825928},
  {id:326, compound:"X47", p:0.591650584, p_adj:0.90183871, fc:1.043791313},
  {id:327, compound:"X39", p:0.800272332, p_adj:0.956810569, fc:1.01301342}
]

const [sortModel, setSortModel] = React.useState([
    {
      field: 'p_adj',
      sort: 'asc',
    },
  ]);

    return (
      <div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" style={{ color: 'white' }} gutterBottom>
              Primary Metabolites
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{ color: 'white' }} paragraph >
              Analysis of GC-TOF MS data from <Link href="https://supermeditate.me" target="_new" style={{ color: '#fbbe00' }}>Super Meditate Me</Link>
            </Typography>
          </Container>
        </div>
        <Container maxWidth="md">
        <Box p={5}>
          <Typography align="left" color="textPrimary"  paragraph >
                <Link href="/serum" color="secondary">&lt;&lt;  Back</Link>
          </Typography>
          <Typography variant="h4" align="left" paragraph >
                Enriched Networks
          </Typography>
            <img src={enriched_network} alt="Enriched Network" style={{ width: '100%'}}/>
          <br/>
          <br/>
          <br/>
          <Typography variant="h4" align="left" paragraph >
                Compounds (327)
          </Typography>
          <div style={{ height: 800, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
        />
          </div>
        </Box>
    </Container>
  </div>
      );
}