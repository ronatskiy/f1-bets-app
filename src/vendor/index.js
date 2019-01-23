import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "moment/locale/ru";
import moment from "moment";
moment.locale("ru");

library.add(faAngleDown, faTelegram);
dom.watch();

export {
	Badge,
	Button,
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Table,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Navbar,
	NavbarToggler,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	UncontrolledDropdown,
	TabContent,
	TabPane,
	FormText,
	FormFeedback,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "./reactstrap-vendor";
