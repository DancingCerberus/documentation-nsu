import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { API_BASE_URL } from '../config';

function ApiPanel() {
    return (
        <div className="content">
            <SwaggerUI url={`${API_BASE_URL}/openapi.json`} />;
        </div>
    )
}

export default ApiPanel;