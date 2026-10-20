import React, { useMemo, useRef, useState } from 'react';
import { MobileFormRenderer } from '@flowform/mobile';
import type { MobileFormHandle } from '@flowform/mobile';
import { initMicro, ReactRemoteComponent } from 'remote-component-loader';

initMicro(`${window.location.origin}/micro/components/find`, 'flowform-example');

const schema = {
  type: 'object', properties: {
    details: { type: 'void', 'x-component': 'Card', 'x-component-props': { title: '客户登记' }, properties: {
      name: { type: 'string', title: '姓名', required: true, 'x-decorator': 'FormItem', 'x-component': 'Input', 'x-component-props': { placeholder: '请输入姓名' } },
    } },
  },
};

const MobileLowCodeExample: React.FC = () => {
  const [remote, setRemote] = useState(false);
  const [version, setVersion] = useState('0.0.2');
  const [result, setResult] = useState('');
  const ref = useRef<MobileFormHandle>(null);
  const components = useMemo(() => remote ? { Input: (props: any) => <ReactRemoteComponent name="Input" version={version} componentProps={props} /> } : undefined, [remote, version]);
  const submit = async () => { try { setResult(JSON.stringify(await ref.current?.submit())); } catch { setResult('校验未通过'); } };
  return <div style={{ maxWidth: 420, margin: '0 auto' }}><h3>Mobile 低代码验证</h3><label><input type="checkbox" checked={remote} onChange={event => setRemote(event.target.checked)} /> 使用远程 Input</label><input value={version} onChange={event => setVersion(event.target.value)} aria-label="组件版本" />
    <MobileFormRenderer key={`${remote}-${version}`} ref={ref} schema={schema} componentsData={components} initialValues={{ name: '张三' }} />
    <button type="button" onClick={submit}>校验并读取表单值</button><pre>{result}</pre>
  </div>;
};
export default MobileLowCodeExample;
