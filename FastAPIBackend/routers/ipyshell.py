import uuid
from threading import Timer
from IPython.core.interactiveshell import InteractiveShell
from io import StringIO
import sys
from .config import SESSION_TIME

class IPySession(object):
    class Shell(object):
        def __init__(self,id) -> None:
            super().__init__()
            self.id = id
            self.sh=InteractiveShell()
        def exec(self,code):
            sout = StringIO()
            oout =  sys.stdout
            sys.stdout = sout
            return_exe = self.sh.run_cell(code).result
            out_exe = sout.getvalue()
            sys.stdout = oout
            return_exe = f"{return_exe}" if return_exe is not None else None
            out_exe = out_exe if out_exe else "None"
            return {'output':out_exe,'return':return_exe}
        def getVariables(self):
            return {self.sh}     
    session = {}
    def __init__(self, uid) -> None:
        self.uid = uid
        self.shells = {}
        self.selected=None
        self.timer = Timer(SESSION_TIME,self.destroy)
        self.timer.start()
    def destroy(self):
        uid = self.uid
        del self.session[uid]
        del self
        # print(f"Deleated {uid}")
    def delete(self,cred):
        # Check(cred)
        shell=cred.shell_id
        if shell is None:
            for i in self.shells:
                del self.shells[i]
    def restart(self):
        self.timer.cancel()
        self.timer =  Timer(SESSION_TIME,self.destroy)
        self.timer.start()
    @classmethod
    def create(self, user_info) -> None:
        # check_user(user_info)
        uid = user_info.uid
        ses = self(uid)
        ses.add(user_info.shell_id)
        self.session[uid] = ses        
        return ses
    @classmethod
    def get(self, cred) :
        # check_user(cred)
        try:return self.session[cred.uid]
        except: return None
    @staticmethod
    def getAll(self):
        return list(self.session.keys())
    def add(self,shell_id):
        # shell_id=str(uuid.uuid1())
        self.shells[shell_id]=self.Shell(shell_id)
        # return self.shells[shell_id].id
    def remove(self, shell_id):
        del  self.shells[shell_id]
    def exec(self, codeLine, shell_id):
        print(self.shells.keys())
        if shell_id in self.shells.keys() :
            print(self.shells[shell_id])
            return self.shells[shell_id].exec(codeLine)
        else: 
            self.add(shell_id)
    # def select(self, id):
    #     self.selected=self.shells[id]
    def getAll(self):
        return list(self.shells.keys())
    
    
