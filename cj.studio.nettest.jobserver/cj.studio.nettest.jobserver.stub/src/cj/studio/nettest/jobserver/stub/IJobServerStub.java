package cj.studio.nettest.jobserver.stub;

import cj.studio.ecm.net.CircuitException;
import cj.studio.gateway.stub.annotation.CjStubInContentKey;
import cj.studio.gateway.stub.annotation.CjStubInParameter;
import cj.studio.gateway.stub.annotation.CjStubMethod;
import cj.studio.gateway.stub.annotation.CjStubService;
import cj.studio.nettest.jobserver.args.JobSender;

@CjStubService(bindService = "/jobserver.service", usage = "作业服务器")
public interface IJobServerStub {
	@CjStubMethod(command = "post", usage = "添加作业")
	void addJob(@CjStubInParameter(key = "mid", usage = "方法标识") String mid,
			@CjStubInContentKey(key = "sender", usage = "发送者") JobSender sender) throws CircuitException;

	@CjStubMethod(command = "post", usage = "添加作业")
	void addJobByRunner(@CjStubInParameter(key = "mid", usage = "方法标识") String mid,
			@CjStubInParameter(key = "runnerid", usage = "运行策略id") String runnerid,
			@CjStubInContentKey(key = "sender", usage = "发送者") JobSender sender) throws CircuitException;
	@CjStubMethod(command = "post", usage = "停止运行器")
	void stopJobRunner(@CjStubInParameter(key = "mid", usage = "方法标识") String mid,
			@CjStubInParameter(key = "sender", usage = "发送者") String sender) throws CircuitException;
}
