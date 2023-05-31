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
            r = self.sh.run_cell(code).result
            o= sout.getvalue()
            sys.stdout = oout
            return {'output':o,'return':r}
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
    def restart(self):
        self.timer.cancel()
        self.timer.start()
    @classmethod
    def create(self, user_info) -> None:
        # check_user(user_info)
        uid = user_info['uid']
        ses = self(uid)
        shell_id = ses.add()
        self.session[uid] = ses        
        return ses,shell_id
    @classmethod
    def get(self, cred) :
        # check_user(cred)
        try:return self.session[cred['uid']]
        except: return None
    @staticmethod
    def getAll(self):
        return list(self.session.keys())
    def add(self):
        shell_id=str(uuid.uuid1())
        self.shells[shell_id]=self.Shell(shell_id)
        return self.shells[shell_id].id
    def remove(self, shell_id):
        del  self.shells[shell_id]
    def exec(self, codeLine, shell_id):
        print(self.shells.keys())
        if shell_id in self.shells.keys() :
            print(self.shells[shell_id])
            return self.shells[shell_id].exec(codeLine)
        else: return {"status":"error"}
    # def select(self, id):
    #     self.selected=self.shells[id]
    def getAll(self):
        return list(self.shells.keys())
    
    
