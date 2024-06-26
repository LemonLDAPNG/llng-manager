import { useAppDispatch } from "../app/hooks";
import { CasIssuer } from "../components/issuersComponents/CasIssuer";
import { GetIssuer } from "../components/issuersComponents/GetIssuer";
import { OIDCIssuer } from "../components/issuersComponents/OIDCIssuer";
import { OIDIssuer } from "../components/issuersComponents/OIDIssuer";
import { SAMLIssuer } from "../components/issuersComponents/SAMLIssuer";
import { setError } from "../features/config/configSlice";

export function IssuerDashboard({ type }: { type: string }) {
  const dispatch = useAppDispatch();
  try {
    switch (type) {
      case "cas":
        return <CasIssuer />;
      case "saml":
        return <SAMLIssuer />;
      case "oidc":
        return <OIDCIssuer />;
      case "get":
        return <GetIssuer />;
      case "oid":
        return <OIDIssuer />;
      default:
        return <div>¯\_(ツ)_/¯</div>;
    }
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setError(e.message));
    }
    return <div>Error</div>;
  }
}
