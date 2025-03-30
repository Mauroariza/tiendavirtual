package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Habilitar el modo de depuración web si es necesario
        android.webkit.WebView.setWebContentsDebuggingEnabled(true);
    }
}
