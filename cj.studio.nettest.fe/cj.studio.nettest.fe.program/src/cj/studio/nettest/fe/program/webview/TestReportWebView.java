package cj.studio.nettest.fe.program.webview;

import cj.studio.ecm.annotation.CjBridge;
import cj.studio.ecm.annotation.CjService;
import cj.studio.ecm.annotation.CjServiceRef;
import cj.studio.ecm.net.Circuit;
import cj.studio.ecm.net.CircuitException;
import cj.studio.ecm.net.Frame;
import cj.studio.ecm.net.io.MemoryContentReciever;
import cj.studio.ecm.net.io.MemoryInputChannel;
import cj.studio.gateway.socket.app.IGatewayAppSiteResource;
import cj.studio.gateway.socket.app.IGatewayAppSiteWayWebView;
import cj.studio.gateway.socket.pipeline.IOutputSelector;
import cj.studio.gateway.stub.annotation.CjStubRef;
import cj.studio.nettest.be.args.SimpleReport;
import cj.studio.nettest.be.stub.IRequestConfigStub;
import cj.studio.nettest.fe.program.IOnlineTable;
import cj.ultimate.gson2.com.google.gson.Gson;
@CjBridge(aspects = "@rest")
@CjService(name = "/test-report.service")
public class TestReportWebView implements IGatewayAppSiteWayWebView {
	@CjServiceRef(refByName = "online")
	IOnlineTable table;
	@CjServiceRef(refByName="$.output.selector")
	IOutputSelector selector;
	@CjStubRef(remote = "rest://backend/nettest/", stub = IRequestConfigStub.class)
	IRequestConfigStub rcStub;
	@Override
	public void flow(Frame f, Circuit c, IGatewayAppSiteResource ctx) throws CircuitException {
		f.content().accept(new MemoryContentReciever() {
			@Override
			public void done(byte[] b, int pos, int length) throws CircuitException {
				super.done(b, pos, length);
				String sender=f.parameter("sender");
				String pipelineName=table.getUserOnPipeline(sender);
				MemoryInputChannel in=new MemoryInputChannel();
				MemoryContentReciever reciever=new MemoryContentReciever();
				Frame frame=new Frame(in,String.format("%s %s %s", f.command(),f.url(),f.protocol()));
				frame.content().accept(reciever);
				in.begin(frame);
				byte[] arr=readFully();
				in.done(arr, 0, arr.length);
				
				SimpleReport report=new Gson().fromJson(new String(arr), SimpleReport.class);
				rcStub.saveAndUpdateRequestResponse(report, report.getCreator());
				
				selector.select(pipelineName).send(frame, c);
				
//				System.out.println("report:" + sender+"  "+pipelineName);
			}
		});
		
	}

}
